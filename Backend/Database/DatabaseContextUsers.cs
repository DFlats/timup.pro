using Backend.Dtos;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Database;

public partial class DatabaseContext
{
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
}