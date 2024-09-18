using Backend.Controllers;
using Backend.Dtos;
using Backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Database;
public class DatabaseContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<Progress> Progresses { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<Description> Descriptions { get; set; }

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

    internal List<ProjectResponse> GetAllProjects()
    {
        return [.. Projects.Include(p => p.Author)
                            .Include(p => p.Description)
                            .ThenInclude(p => p.Tags)
                            .Select(p => (ProjectResponse) p)];
    }

    internal bool PopulateProjects(int count = 10)
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

    internal User AddUser(UserRequest userToAdd)
    {
        var user = new User
        {
            ClerkId = userToAdd.ClerkId,
            Name = userToAdd.Name,
            Email = userToAdd.Email
        };

        Users.Add(user);
        SaveChanges();
        return user;
    }

    internal bool AddTagToUser(string id, TagRequest tagToAdd)
    {
        var user = Users.Include(u => u.Tags).FirstOrDefault(u => u.ClerkId == id);
        if (user is null) return false;

        if (user.Tags.FirstOrDefault(t => t.TagValue == tagToAdd.TagName && t.IsSkill == tagToAdd.IsSkill) == null)
        {
            Tag newTag = new Tag
            {
                TagValue = tagToAdd.TagName,
                IsSkill = tagToAdd.IsSkill,
                UserId = id
            };
            Tags.Add(newTag);
            user.Tags.Add(newTag);
            return true;
        }
        return true;
    }

    internal bool RemoveTagFromUser(string id, TagRequest tagToRemove)
    {
        var user = Users.Include(u => u.Tags).FirstOrDefault(u => u.ClerkId == id);
        if (user is null) return false;

        var tag = user.Tags.FirstOrDefault(t => t.TagValue == tagToRemove.TagName && t.IsSkill == tagToRemove.IsSkill);
        if (tag != null)
        {
            user.Tags.Remove(tag);
            Tags.Remove(tag);
            return true;
        }
        return false;
    }

    internal List<ProjectResponse> GetProjectsByFilter(string[] skills, string[] interests)
    {
        var projects = Projects
            .Include(p => p.Author)
            .Include(p => p.Description)
            .ThenInclude(p => p.Tags)
            .Where(p => p.Description.Tags.Any(t => skills.Contains(t.TagValue) && t.IsSkill || interests.Contains(t.TagValue) && !t.IsSkill))
            .Select(p => (ProjectResponse)p)
            .ToList();

        return projects;
    }

    internal List<ProjectResponse> GetRecommendedProjectsByUserId(string id)
    {
        var user = GetUserById(id);

        if (user is null) return [];

        var interests = user.Tags.Where(t => t.IsSkill == false).Select(t => t.TagValue).ToArray();
        var skills = user.Tags.Where(t => t.IsSkill == true).Select(t => t.TagValue).ToArray();

        var projects = Projects
            .Include(p => p.Author)
            .Include(p => p.Description)
            .ThenInclude(p => p.Tags)
            .Where(p => p.Description.Tags.Any(t => skills.Contains(t.TagValue) && t.IsSkill || interests.Contains(t.TagValue) && !t.IsSkill))
            .Select(p => (ProjectResponse)p)
            .ToList();

        return projects;
    }

    private static User? getUser(string userId, DbSet<User> Users)
    {
        return Users.FirstOrDefault(u => u.ClerkId == userId);
    }

    internal (Statuses, Project?) CreateProject(ProjectRequest projectRequest)
    {
        User? user = getUser(projectRequest.AuthorId, Users);
        if (user is null) return (Statuses.UserNotFound, null);
        var description = new Description { Text = projectRequest.Description };

        var project = new Project
        {
            Title = projectRequest.Title,
            Author = user,
            AuthorId = user.ClerkId,
            Description = description,
        };
        Descriptions.Add(description);
        Projects.Add(project);
        user.Projects.Add(project);
        return (Statuses.Ok, project);
    }

    internal Project? GetProjectById(int id)
    {
        return Projects.Include(p => p.Description).ThenInclude(d => d.Tags)
                        .Include(p => p.Author)
                        .FirstOrDefault(p => p.Id == id);
    }

    internal (Statuses, List<Project>?) GetProjectsByUserId(string id)
    {
        var user = GetUserById(id);
        if(user is null) return (Statuses.UserNotFound, null); 
        return (Statuses.Ok, user.Projects);
    }

    public enum Statuses
    {
        UserNotFound,
        ProjectNotFound,
        TagAlreadyExists,
        TagNotFound,
        Ok
    }
}