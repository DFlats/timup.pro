using Backend.Dtos;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Database;

public partial class DatabaseContext
{
    internal List<ProjectResponse> GetAllProjects(int? page = 1)
    {
        return [.. Projects.Include(p => p.Author)
                            .Include(p => p.Description)
                            .ThenInclude(p => p.Tags)
                            .Include(p => p.Collaborators).ThenInclude(u => u.User)
                            .Skip(((int)page! - 1) * _pageSize)
                            .Take(_pageSize)
                            .Select(p => (ProjectResponse) p)];
    }

    internal List<ProjectResponse> GetProjectsByFilter(string[]? skills, string[]? interests, int? page = 1)
    {
        skills ??= [];
        interests ??= [];

        return [.. Projects
            .Include(p => p.Author)
            .Include(p => p.Description)
            .ThenInclude(p => p.Tags)
            .Include(p => p.Collaborators).ThenInclude(u => u.User)
            .Where(p => p.Description.Tags.Any(t => skills.Contains(t.TagValue) && t.IsSkill || interests.Contains(t.TagValue) && !t.IsSkill))
            .Skip(((int)page! - 1) * _pageSize)
            .Take(_pageSize)
            .Select(p => (ProjectResponse)p)];
    }

    internal (DbErrorStatusCodes, List<ProjectResponse>?) GetRecommendedProjectsByUserId(string id, int? page = 1)
    {
        var user = GetUserById(id);

        if (user is null) return (DbErrorStatusCodes.UserNotFound, null);

        var interests = user.Tags.Where(t => t.IsSkill == false).Select(t => t.TagValue).ToArray();
        var skills = user.Tags.Where(t => t.IsSkill == true).Select(t => t.TagValue).ToArray();

        var projects = Projects
            .Include(p => p.Author)
            .Include(p => p.Description)
            .ThenInclude(p => p.Tags)
            .Include(p => p.Collaborators).ThenInclude(u => u.User)
            .Where(p => p.Description.Tags.Any(t => skills.Contains(t.TagValue) && t.IsSkill || interests.Contains(t.TagValue) && !t.IsSkill))
            .Skip(((int)page! - 1) * _pageSize)
            .Take(_pageSize)
            .Select(p => (ProjectResponse)p)
            .ToList();

        return (DbErrorStatusCodes.Ok, projects);
    }

    internal ProjectDbResponse CreateProject(ProjectRequest projectRequest)
    {
        User? user = GetUser(projectRequest.AuthorId, Users);
        if (user is null) return new ProjectDbResponse(DbErrorStatusCodes.UserNotFound, null);
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
        user.ProjectsAuthored.Add(project);
        SaveChanges();
        return new ProjectDbResponse(DbErrorStatusCodes.Ok, project);
    }

    internal Project? GetProjectById(int id)
    {
        return Projects.Include(p => p.Description).ThenInclude(d => d.Tags)
                        .Include(p => p.Author)
                        .Include(P => P.Progress)
                        .Include(p => p.Collaborators).ThenInclude(u => u.User)
                        .Include(p => p.ProjectInvites).ThenInclude(i => i.User)
                        .FirstOrDefault(p => p.Id == id);
    }

    internal ProjectsDbResponse GetProjectsByUserId(string id, int? page = 1)
    {
        var user = GetUserById(id);
        if (user is null) return new ProjectsDbResponse(DbErrorStatusCodes.UserNotFound, null, false);
        var projects = new List<Project>();
        projects.AddRange(user.ProjectsAuthored);
        projects.AddRange(user.ProjectsCollaborated.Select(p => p.Project));
        bool hasNext = (page * _pageSize) < projects.Count;
        
        return new ProjectsDbResponse
        (
            DbErrorStatusCodes.Ok,
            projects.Skip(((int)page! - 1) * _pageSize).Take(_pageSize).ToArray(),
            hasNext
        );
    }

    internal DbErrorStatusCodes UpdateProject(ProjectPatchRequest requestBody)
    {
        var user = Users.
        Include(u => u.ProjectsAuthored).ThenInclude(p => p.Progress)
            .Include(u => u.ProjectsAuthored).ThenInclude(p => p.Description).ThenInclude(d => d.Tags)
            .FirstOrDefault(u => u.ClerkId == requestBody.AuthorId);
        if (user is null) return DbErrorStatusCodes.UserNotFound;

        var project = user.ProjectsAuthored.FirstOrDefault(p => p.Id == requestBody.ProjectId);
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
                    DescriptionId = project.Description.Id
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
                    DescriptionId = project.Description.Id
                };
                Tags.Add(newTag);
                project.Description.Tags.Add(newTag);
            }
        }

        project.Progress.IsCompleted = requestBody.IsCompleted ?? project.Progress.IsCompleted;


        SaveChanges();
        return DbErrorStatusCodes.Ok;
    }

    private bool AddUserToProject(User user, Project project)
    {
        if (project.AuthorId == user.ClerkId) return false;
        if (project.Collaborators.Any(u => u.UserId == user.ClerkId)) return false;
        project.Collaborators.Add(new Collaborator { UserId = user.ClerkId, User = user });
        user.ProjectsCollaborated.Add(new ProjectCollaborated { Project = project, ProjectId = project.Id });
        SaveChanges();
        return true;
    }

    internal DbErrorStatusCodes DeleteProject(int projectId)
    {
        var project = Projects.FirstOrDefault(p => p.Id == projectId);
        if (project is null) return DbErrorStatusCodes.UserNotFound;
        Projects.Remove(project);
        SaveChanges();
        return DbErrorStatusCodes.Ok;
    }
}