using Backend.Dtos;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Database;

public partial class DatabaseContext
{
    internal List<UserResponse> GetAllUsers(int? page = 1)
    {
        return [.. Users
            .Include(u => u.Tags)
            .Skip(((int)page! - 1) * _pageSize)
            .Take(_pageSize)
            .Select(u => (UserResponse) u)];
    }

    internal List<UserResponse> GetUsersByFilter(string[]? skills, string[]? interests, int? page = 1)
    {

        skills ??= [];
        interests ??= [];

        return [.. Users
            .Include(u => u.Tags)
            .Where(u => u.Tags.Any(t => skills.Contains(t.TagValue) && t.IsSkill || interests.Contains(t.TagValue) && !t.IsSkill))
            .Skip(((int)page! - 1) * _pageSize)
            .Take(_pageSize)
            .Select(u => (UserResponse)u)];
    }

    internal User? GetUserById(string userId)
    {
        var user = Users
        .Include(u => u.Projects).ThenInclude(p => p.Description).ThenInclude(d => d.Tags)
        .Include(u => u.Tags)
        .FirstOrDefault(u => u.ClerkId == userId);
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

    private static User? GetUser(string userId, DbSet<User> Users)
    {
        return Users.FirstOrDefault(u => u.ClerkId == userId);
    }

    internal (DbErrorStatusCodes, List<User>?) GetRecommendedUsersByProjectId(int projectId, int? page = 1)
    {
        var project = GetProjectById(projectId);

        if (project is null) return (DbErrorStatusCodes.ProjectNotFound, null);

        var interests = project.Description.Tags.Where(t => t.IsSkill == false).Select(t => t.TagValue).ToArray();
        var skills = project.Description.Tags.Where(t => t.IsSkill == true).Select(t => t.TagValue).ToArray();

        var users = Users
            .Include(u => u.Tags)
            .Where(u => u.Tags.Any(t => skills.Contains(t.TagValue) && t.IsSkill || interests.Contains(t.TagValue) && !t.IsSkill))
            .OrderByDescending(p => p.Tags.Count(t => skills.Contains(t.TagValue) && t.IsSkill))
            .Skip(((int)page! - 1) * _pageSize)
            .Take(_pageSize)
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
        return DbErrorStatusCodes.Ok;
    }

    internal DbErrorStatusCodes DeleteUser(string userId)
    {
        var user = Users.Include(u => u.Tags).FirstOrDefault(u => u.ClerkId == userId);
        if (user is null) return DbErrorStatusCodes.UserNotFound;
        var projects = Projects.Where(p => p.AuthorId == userId);
        if (projects is not null)
        {
            foreach (var p in projects)
            {
                Projects.Remove(p);
            }
        }
        Users.Remove(user);
        SaveChanges();
        return DbErrorStatusCodes.Ok;
    }
}