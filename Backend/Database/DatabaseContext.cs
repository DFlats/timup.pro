using Backend.Dtos;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Database;
public partial class DatabaseContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<Progress> Progresses { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<Description> Descriptions { get; set; }
    public DbSet<ProjectInvite> ProjectInvites { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Project>()
            .HasOne(p => p.Author)
            .WithMany(u => u.Projects)
            .HasForeignKey(p => p.AuthorId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Description>()
            .HasMany(d => d.Tags)
            .WithOne()
            .HasForeignKey(t => t.DescriptionId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<User>()
            .HasMany(u => u.Tags)
            .WithOne()
            .HasForeignKey(t => t.UserId)
            .OnDelete(DeleteBehavior.Restrict);
    }

    internal bool PopulateProjects(int count = 1000)
    {
        try
        {
            var (seededProjects, seededUsers, seededTags) = DbSeeder.GenerateProjects(count);
            Console.WriteLine("hello");

            Users.AddRange(seededUsers);
            Projects.AddRange(seededProjects);
            Tags.AddRange(seededTags);

            SaveChanges();
            return true;
        }
        catch
        {
            return false;
        }
    }

    internal User? GetUserById(string id)
    {
        var user = Users
        .Include(u => u.Projects).ThenInclude(p => p.Description).ThenInclude(d => d.Tags)
        .Include(u => u.Tags)
        .FirstOrDefault(u => u.ClerkId == id);
        if (user is null) return null;
        return user;
    }

    internal (DbErrorStatusCodes, User?) CreateUser(UserRequest userToAdd)
    {
        if (Users.Any(u => u.ClerkId == userToAdd.ClerkId)) return (DbErrorStatusCodes.UserAlreadyExists, null);
        try
        {
            var user = new User
            {
                ClerkId = userToAdd.ClerkId,
                Name = userToAdd.Name,
                Email = userToAdd.Email
            };
            Users.Add(user);
            SaveChanges();
            return (DbErrorStatusCodes.Ok, user);
        }
        catch
        {
            return (DbErrorStatusCodes.UserAlreadyExists, null);
        }
    }

    internal DbErrorStatusCodes AddTagToUser(string id, TagRequest tagToAdd)
    {
        var user = Users.Include(u => u.Tags).FirstOrDefault(u => u.ClerkId == id);
        if (user is null) return DbErrorStatusCodes.UserNotFound;

        if (user.Tags.FirstOrDefault(t => t.TagValue == tagToAdd.TagName && t.IsSkill == tagToAdd.IsSkill) == null)
        {
            Tag newTag = new()
            {
                TagValue = tagToAdd.TagName,
                IsSkill = tagToAdd.IsSkill,
                UserId = id
            };
            Tags.Add(newTag);
            user.Tags.Add(newTag);
            SaveChanges();
            return DbErrorStatusCodes.Ok;
        }
        return DbErrorStatusCodes.TagAlreadyExists;
    }

    internal DbErrorStatusCodes RemoveTagFromUser(string id, TagRequest tagToRemove)
    {
        var user = Users.Include(u => u.Tags).FirstOrDefault(u => u.ClerkId == id);
        if (user is null) return DbErrorStatusCodes.UserNotFound;

        var tag = user.Tags.FirstOrDefault(t => t.TagValue == tagToRemove.TagName && t.IsSkill == tagToRemove.IsSkill);
        if (tag != null)
        {
            user.Tags.Remove(tag);
            Tags.Remove(tag);
            SaveChanges();
            return DbErrorStatusCodes.Ok;
        }
        return DbErrorStatusCodes.TagNotFound;
    }

    private static User? GetUser(string userId, DbSet<User> Users)
    {
        return Users.FirstOrDefault(u => u.ClerkId == userId);
    }



    internal (DbErrorStatusCodes, List<User>?) GetRecommendedUsersByProjectId(int id)
    {
        var project = GetProjectById(id);

        if (project is null) return (DbErrorStatusCodes.ProjectNotFound, null);

        var interests = project.Description.Tags.Where(t => t.IsSkill == false).Select(t => t.TagValue).ToArray();
        var skills = project.Description.Tags.Where(t => t.IsSkill == true).Select(t => t.TagValue).ToArray();

        var users = Users
            .Include(u => u.Tags)
            .Where(u => u.Tags.Any(t => skills.Contains(t.TagValue) && t.IsSkill || interests.Contains(t.TagValue) && !t.IsSkill))
            .ToList();

        return (DbErrorStatusCodes.Ok, users);
    }

    
    internal DbErrorStatusCodes UpdateUser(UserPatchRequest requestBody)
    {
        var user = Users.Include(u => u.Tags).FirstOrDefault(u => u.ClerkId == requestBody.ClerkId);
        if (user is null) return DbErrorStatusCodes.UserNotFound;

        if (requestBody.SkillTags is not null)
        {
            user.Tags
                .Where(t => t.IsSkill == true)
                .ToList()
                .ForEach(t => user.Tags
                .Remove(t));

            foreach (var skill in requestBody.SkillTags)
            {
                Tag newTag = new()
                {
                    TagValue = skill,
                    IsSkill = true,
                    UserId = requestBody.ClerkId
                };
                Tags.Add(newTag);
                user.Tags.Add(newTag);
            }
        }

        if (requestBody.InterestTags is not null)
        {
            user.Tags
                .Where(t => t.IsSkill == false)
                .ToList()
                .ForEach(t => user.Tags
                .Remove(t));

            foreach (var interest in requestBody.InterestTags)
            {
                Tag newTag = new()
                {
                    TagValue = interest,
                    IsSkill = false,
                    UserId = requestBody.ClerkId
                };
                Tags.Add(newTag);
                user.Tags.Add(newTag);
            }
        }

        SaveChanges();
        return DbErrorStatusCodes.NoContent;
    }



    private bool RemoveCollaboratorFromProject(User user, Project project)
    {
        if (project.AuthorId == user.ClerkId) return false;
        if (!project.Collaborators.Any(u => u.ClerkId == user.ClerkId)) return false;
        project.Collaborators.Remove(user);
        user.Projects.Remove(project);
        SaveChanges();
        return true;
    }

    internal DbErrorStatusCodes HandleJoinProjectRequest(string userId, int projectId)
    {
        var user = GetUserById(userId);
        if (user is null) return DbErrorStatusCodes.UserNotFound;

        var project = GetProjectById(projectId);
        if (project is null) return DbErrorStatusCodes.ProjectNotFound;

        if (project.AuthorId == userId) return DbErrorStatusCodes.UserAlreadyInProject;

        if (project.Collaborators.Any(u => u.ClerkId == userId)) return DbErrorStatusCodes.UserAlreadyInProject;

        if (project.ProjectInvites.Any(p => p.User.ClerkId == userId)) return DbErrorStatusCodes.UserAlreadyInvited;

        AddProjectJoinRequest(user, project);

        return DbErrorStatusCodes.Ok;
    }

    private void AddProjectJoinRequest(User user, Project project)
    {
        var projectInvite = new ProjectInvite
        {
            User = user,
            Project = project
        };
        ProjectInvites.Add(projectInvite);
        SaveChanges();
    }

    internal DbErrorStatusCodes HandleAcceptProjectInviteRequest(string userId, int projectId)
    {
        var user = GetUserById(userId);
        if (user is null) return DbErrorStatusCodes.UserNotFound;

        var project = GetProjectById(projectId);
        if (project is null) return DbErrorStatusCodes.ProjectNotFound;

        if (project.AuthorId == userId) return DbErrorStatusCodes.UserIsAlreadyOwner;

        if (project.Collaborators.Any(u => u.ClerkId == userId)) return DbErrorStatusCodes.UserAlreadyInProject;

        if (!project.ProjectInvites.Any(p => p.User.ClerkId == userId)) return DbErrorStatusCodes.UserNotFoundInProject;

        AddUserToProject(user, project);
        RemoveProjectInvite(user, project);

        return DbErrorStatusCodes.Ok;
    }

    private void RemoveProjectInvite(User user, Project project)
    {
        var projectInvite = project.ProjectInvites.FirstOrDefault(p => p.User.ClerkId == user.ClerkId);
        if (projectInvite is not null)
        {
            ProjectInvites.Remove(projectInvite);
            SaveChanges();
        }
    }

    internal object HandleDeclineProjectInviteRequest(string userId, int projectId)
    {
        var user = GetUserById(userId);
        if (user is null) return DbErrorStatusCodes.UserNotFound;

        var project = GetProjectById(projectId);
        if (project is null) return DbErrorStatusCodes.ProjectNotFound;

        if (!project.ProjectInvites.Any(p => p.User.ClerkId == userId)) return DbErrorStatusCodes.UserNotFoundInProject;

        RemoveProjectInvite(user, project);

        return DbErrorStatusCodes.Ok;
    }

    internal DbErrorStatusCodes HandleLeaveProjectRequest(string userId, int projectId)
    {
        var user = GetUserById(userId);
        if (user is null) return DbErrorStatusCodes.UserNotFound;

        var project = GetProjectById(projectId);
        if (project is null) return DbErrorStatusCodes.ProjectNotFound;

        if (project.AuthorId == userId) return DbErrorStatusCodes.UserIsAlreadyOwner;

        if (!project.Collaborators.Any(u => u.ClerkId == userId)) return DbErrorStatusCodes.UserNotFoundInProject;

        RemoveCollaboratorFromProject(user, project);

        return DbErrorStatusCodes.Ok;
    }

    internal DbErrorStatusCodes HandleKickUserRequest(string userId, int projectId)
    {
        var user = GetUserById(userId);
        if (user is null) return DbErrorStatusCodes.UserNotFound;

        var project = GetProjectById(projectId);
        if (project is null) return DbErrorStatusCodes.ProjectNotFound;

        if (project.AuthorId == userId) return DbErrorStatusCodes.UserIsAlreadyOwner;

        if (!project.Collaborators.Any(u => u.ClerkId == userId)) return DbErrorStatusCodes.UserNotFoundInProject;

        RemoveCollaboratorFromProject(user, project);

        return DbErrorStatusCodes.Ok;
    }

    internal DbErrorStatusCodes InviteToProject(string userId, int projectId)
    {
        var user = GetUserById(userId);
        if (user is null) return DbErrorStatusCodes.UserNotFound;

        var project = GetProjectById(projectId);
        if (project is null) return DbErrorStatusCodes.ProjectNotFound;

        if (project.AuthorId == userId) return DbErrorStatusCodes.UserIsAlreadyOwner;

        if (project.Collaborators.Any(u => u.ClerkId == userId)) return DbErrorStatusCodes.UserAlreadyInProject;

        if (user.ProjectInvites.Any(i => i.Project.Id == projectId)) return DbErrorStatusCodes.UserAlreadyInvited;

        UserAddInviteToProject(user, project);

        return DbErrorStatusCodes.Ok;
    }

    private void UserAddInviteToProject(User user, Project project)
    {
        var projectInvite = new ProjectInvite
        {
            User = user,
            Project = project
        };
        user.ProjectInvites.Add(projectInvite);
        ProjectInvites.Add(projectInvite);
        SaveChanges();
    }

    internal DbErrorStatusCodes HandleInviteUserToProjectAccept(string userId, int projectId)
    {
        var user = GetUserById(userId);
        if (user is null) return DbErrorStatusCodes.UserNotFound;

        var project = GetProjectById(projectId);
        if (project is null) return DbErrorStatusCodes.ProjectNotFound;

        if (project.AuthorId == userId) return DbErrorStatusCodes.UserIsAlreadyOwner;

        if (project.Collaborators.Any(u => u.ClerkId == userId)) return DbErrorStatusCodes.UserAlreadyInProject;

        if (!project.ProjectInvites.Any(p => p.User.ClerkId == userId)) return DbErrorStatusCodes.NoInviteFound;

        AddUserToProject(user, project);
        UserRemoveProjectInvite(user, project);

        return DbErrorStatusCodes.Ok;
    }

    private void UserRemoveProjectInvite(User user, Project project)
    {
        var projectInvite = user.ProjectInvites.FirstOrDefault(p => p.Project.Id == project.Id);
        if (projectInvite is not null)
        {
            user.ProjectInvites.Remove(projectInvite);
            ProjectInvites.Remove(projectInvite);
            SaveChanges();
        }
    }

    internal DbErrorStatusCodes HandleInviteUserToProjectDeny(string userId, int projectId)
    {
        var user = GetUserById(userId);
        if (user is null) return DbErrorStatusCodes.UserNotFound;

        var project = GetProjectById(projectId);
        if (project is null) return DbErrorStatusCodes.ProjectNotFound;

        if (!user.ProjectInvites.Any(p => p.Project.Id == project.Id)) return DbErrorStatusCodes.NoInviteFound;

        UserRemoveProjectInvite(user, project);

        return DbErrorStatusCodes.Ok;
    }
}