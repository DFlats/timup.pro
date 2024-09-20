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