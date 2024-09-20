using Backend.Dtos;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Database;

public partial class DatabaseContext
{
    internal List<ProjectResponse> GetAllProjects()
    {
        return [.. Projects.Include(p => p.Author)
                            .Include(p => p.Description)
                            .ThenInclude(p => p.Tags)
                            .Select(p => (ProjectResponse) p)];
    }

    internal List<ProjectResponse> GetProjectsByFilter(string[]? skills, string[]? interests)
    {

        skills ??= [];
        interests ??= [];

        var projects = Projects
            .Include(p => p.Author)
            .Include(p => p.Description)
            .ThenInclude(p => p.Tags)
            .Where(p => p.Description.Tags.Any(t => skills.Contains(t.TagValue) && t.IsSkill || interests.Contains(t.TagValue) && !t.IsSkill))
            .Select(p => (ProjectResponse)p)
            .ToList();

        return projects;
    }

    internal (DbErrorStatusCodes, List<ProjectResponse>?) GetRecommendedProjectsByUserId(string id)
    {
        var user = GetUserById(id);

        if (user is null) return (DbErrorStatusCodes.UserNotFound, null);

        var interests = user.Tags.Where(t => t.IsSkill == false).Select(t => t.TagValue).ToArray();
        var skills = user.Tags.Where(t => t.IsSkill == true).Select(t => t.TagValue).ToArray();

        var projects = Projects
            .Include(p => p.Author)
            .Include(p => p.Description)
            .ThenInclude(p => p.Tags)
            .Where(p => p.Description.Tags.Any(t => skills.Contains(t.TagValue) && t.IsSkill || interests.Contains(t.TagValue) && !t.IsSkill))
            .Select(p => (ProjectResponse)p)
            .ToList();

        return (DbErrorStatusCodes.Ok, projects);
    }

    internal (DbErrorStatusCodes, Project?) CreateProject(ProjectRequest projectRequest)
    {
        User? user = GetUser(projectRequest.AuthorId, Users);
        if (user is null) return (DbErrorStatusCodes.UserNotFound, null);
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
        SaveChanges();
        return (DbErrorStatusCodes.Ok, project);
    }

    internal Project? GetProjectById(int id)
    {
        return Projects.Include(p => p.Description).ThenInclude(d => d.Tags)
                        .Include(p => p.Author)
                        .Include(P => P.Progress)
                        .Include(p => p.ProjectInvites).ThenInclude(i => i.User)
                        .FirstOrDefault(p => p.Id == id);
    }

    internal (DbErrorStatusCodes, List<Project>?) GetProjectsByUserId(string id)
    {
        var user = GetUserById(id);
        if (user is null) return (DbErrorStatusCodes.UserNotFound, null);
        return (DbErrorStatusCodes.Ok, user.Projects);
    }

    internal DbErrorStatusCodes UpdateProject(ProjectPatchRequest requestBody)
    {
        var user = Users.
        Include(u => u.Projects).ThenInclude(p => p.Progress)
            .Include(u => u.Projects).ThenInclude(p => p.Description).ThenInclude(d => d.Tags)
            .FirstOrDefault(u => u.ClerkId == requestBody.AuthorId);
        if (user is null) return DbErrorStatusCodes.UserNotFound;

        var project = user.Projects.FirstOrDefault(p => p.Id == requestBody.ProjectId);
        if (project is null) return DbErrorStatusCodes.UserNotAuthorized;

        project.Title = requestBody.Title is not null ? requestBody.Title : project.Title;
        project.Description.Text = requestBody.Description is not null ? requestBody.Description : project.Description.Text;

        if (requestBody.SkillTags is not null)
        {
            project.Description.Tags
                .Where(t => t.IsSkill == true)
                .ToList()
                .ForEach(t => project.Description.Tags
                .Remove(t));

            foreach (var skill in requestBody.SkillTags)
            {
                Tag newTag = new()
                {
                    TagValue = skill,
                    IsSkill = true,
                    UserId = requestBody.AuthorId
                };
                Tags.Add(newTag);
                project.Description.Tags.Add(newTag);
            }
        }

        if (requestBody.InterestTags is not null)
        {
            project.Description.Tags
                .Where(t => t.IsSkill == false)
                .ToList()
                .ForEach(t => project.Description.Tags
                .Remove(t));

            foreach (var interest in requestBody.InterestTags)
            {
                Tag newTag = new()
                {
                    TagValue = interest,
                    IsSkill = false,
                    UserId = requestBody.AuthorId
                };
                Tags.Add(newTag);
                project.Description.Tags.Add(newTag);
            }
        }

        project.Progress.IsCompleted = requestBody.IsCompleted ?? project.Progress.IsCompleted;


        SaveChanges();
        return DbErrorStatusCodes.NoContent;
    }

    private bool AddUserToProject(User user, Project project)
    {
        if (project.AuthorId == user.ClerkId) return false;
        if (project.Collaborators.Any(u => u.ClerkId == user.ClerkId)) return false;
        project.Collaborators.Add(user);
        user.Projects.Add(project);
        SaveChanges();
        return true;
    }
}