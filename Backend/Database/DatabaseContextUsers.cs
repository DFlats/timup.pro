using Backend.Dtos;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Database;

public partial class DatabaseContext
{
    internal (List<UserResponse>, bool) GetAllUsers(int? page = 1)
    {
        var users = Users
            .Include(u => u.Tags)
            .Select(u => (UserResponse)u).ToList();

        bool hasNext = page * _pageSize < users.Count;

        users = users
            .Skip(((int)page! - 1) * _pageSize)
            .Take(_pageSize)
            .ToList();

        return (users, hasNext);
    }

    internal (List<UserResponse>, bool) GetUsersByFilter(string[]? skills, string[]? interests, int? page = 1)
    {

        skills ??= [];
        interests ??= [];

        var users = Users
            .Include(u => u.Tags)
            .Where(u => u.Tags.Any(t => skills.Contains(t.TagValue) && t.IsSkill || interests.Contains(t.TagValue) && !t.IsSkill))
            .Select(u => (UserResponse)u).ToList();

        bool hasNext = page * _pageSize < users.Count;

        users = users
            .Skip(((int)page! - 1) * _pageSize)
            .Take(_pageSize)
            .ToList();

        return (users, hasNext);
    }

    internal User? GetUserById(string id)
    {
        var user = Users
        .Include(u => u.ProjectsAuthored).ThenInclude(p => p.Description).ThenInclude(d => d.Tags)
        .Include(u => u.ProjectsAuthored).ThenInclude(p => p.Collaborators).ThenInclude(c => c.User)
        .Include(u => u.ProjectsAuthored).ThenInclude(p => p.Progress)
        .Include(u => u.ProjectsAuthored).ThenInclude(p => p.ProjectInvites)
        //.Include(u => u.ProjectsAuthored).ThenInclude(p => p.Author)

        .Include(u => u.ProjectsCollaborated).ThenInclude(p => p.Project).ThenInclude(p => p.Collaborators).ThenInclude(c => c.User)
        .Include(u => u.ProjectsCollaborated).ThenInclude(p => p.Project).ThenInclude(p => p.Description).ThenInclude(d => d.Tags)
        .Include(u => u.ProjectsCollaborated).ThenInclude(p => p.Project).ThenInclude(p => p.Progress)
        .Include(u => u.ProjectsCollaborated).ThenInclude(p => p.Project).ThenInclude(p => p.Author)
        .Include(u => u.ProjectsCollaborated).ThenInclude(p => p.Project).ThenInclude(p => p.ProjectInvites)

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
            return (DbErrorStatusCodes.FatalError, null);
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

    internal (DbErrorStatusCodes, List<User>?) GetRecommendedUsersByProjectId(int id, int? page = 1)
    {
        var project = GetProjectById(id);

        if (project is null) return (DbErrorStatusCodes.ProjectNotFound, null);

        var interests = project.Description.Tags.Where(t => t.IsSkill == false).Select(t => t.TagValue).ToArray();
        var skills = project.Description.Tags.Where(t => t.IsSkill == true).Select(t => t.TagValue).ToArray();

        var users = Users
            .Include(u => u.Tags)
            .Where(u => u.Tags.Any(t => skills.Contains(t.TagValue) && t.IsSkill || interests.Contains(t.TagValue) && !t.IsSkill))
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