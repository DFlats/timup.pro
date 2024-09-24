using Backend.Dtos;
using Microsoft.EntityFrameworkCore;

namespace Backend.Database;

partial class DatabaseContext
{
    internal ProjectBatchResponse GetProjectBatch(int? page = 1)
    {
        int totalPages = Projects.Count() / _pageSize;

        return new ProjectBatchResponse
        (
            GetAllProjects(page),
            (int)page!,
            totalPages > page ? page + 1 : null
        );
    }

    internal ProjectBatchResponse GetProjectBatchByFilter(string[]? skills, string[]? interests, int? page = 1)
    {
        skills ??= [];
        interests ??= [];

        int projectsCount = Projects
            .Include(p => p.Description)
            .ThenInclude(p => p.Tags)
            .Where(p => p.Description.Tags.Any(t => skills.Contains(t.TagValue) && t.IsSkill || interests.Contains(t.TagValue) && !t.IsSkill))
            .Count();


        return new ProjectBatchResponse(
            GetProjectsByFilter(skills, interests, page),
            (int)page!,
            projectsCount / _pageSize > page ? page + 1 : null

        );
    }

    internal (DbErrorStatusCodes, ProjectBatchResponse?) GetRecommendedProjectBatchByUserId(string id, int? page = 1)
    {
        var user = GetUserById(id);

        if (user is null) return (DbErrorStatusCodes.UserNotFound, null);

        var interests = user.Tags.Where(t => t.IsSkill == false).Select(t => t.TagValue).ToArray();
        var skills = user.Tags.Where(t => t.IsSkill == true).Select(t => t.TagValue).ToArray();

        int projectsCount = Projects
            .Include(p => p.Author)
            .Include(p => p.Description)
            .ThenInclude(p => p.Tags)
            .Where(p => p.Description.Tags.Any(t => skills.Contains(t.TagValue) && t.IsSkill || interests.Contains(t.TagValue) && !t.IsSkill))
            .Count();

        var (status, projectsResponse) = GetRecommendedProjectsByUserId(id, page);

        return status switch
        {
            DbErrorStatusCodes.UserNotFound => (DbErrorStatusCodes.UserNotFound, null),
            DbErrorStatusCodes.Ok => (DbErrorStatusCodes.Ok, new ProjectBatchResponse(
                projectsResponse!,
                (int)page!,
                projectsCount / _pageSize > page ? page + 1 : null)
            ),
            _ => (DbErrorStatusCodes.FatalError, null)
        };
    }

    internal (DbErrorStatusCodes, UserBatchResponse?) GetRecommendedUserBatchByProjectId(int id, int? page = 1)
    {
        var project = GetProjectById(id);

        if (project is null) return (DbErrorStatusCodes.ProjectNotFound, null);

        var interests = project.Description.Tags.Where(t => t.IsSkill == false).Select(t => t.TagValue).ToArray();
        var skills = project.Description.Tags.Where(t => t.IsSkill == true).Select(t => t.TagValue).ToArray();

        int usersCount = Users
            .Include(u => u.Tags)
            .Where(u => u.Tags.Any(t => skills.Contains(t.TagValue) && t.IsSkill || interests.Contains(t.TagValue) && !t.IsSkill))
            .Count();


        var (status, usersResponse) = GetRecommendedUsersByProjectId(id, page);

        return status switch
        {
            DbErrorStatusCodes.ProjectNotFound => (DbErrorStatusCodes.UserNotFound, null),
            DbErrorStatusCodes.Ok => (DbErrorStatusCodes.Ok, new UserBatchResponse(
                usersResponse!.Select(u => (UserResponse)u).ToList(),
                (int)page!,
                usersCount / _pageSize > page ? page + 1 : null)
            ),
            _ => (DbErrorStatusCodes.FatalError, null)
        };
    }

    internal (DbErrorStatusCodes, ProjectBatchResponse?) GetProjectBatchByUserId(string id, int? page)
    {
        var (status, projects, hasNext) = GetProjectsByUserId(id, page);
        if (status != DbErrorStatusCodes.Ok) return (status, null);
        var projectResponses = projects!.Select(p => (ProjectResponse)p).ToList();
        int? nextPage = hasNext ? page + 1 : null;
        int CurrentPage = (int)page!;
        return (DbErrorStatusCodes.Ok, new ProjectBatchResponse(projectResponses, (int)page!, nextPage));
    }

    internal  UserBatchResponse GetUserBatchByFilter(string[]? skills, string[]? interests, int? page = 1)
    {
        var (users, hasNext) = GetUsersByFilter(skills, interests, page);
        int? nextPage = hasNext ? page + 1 : null;
        return  new UserBatchResponse(users, (int)page!, nextPage);
    }

    internal  UserBatchResponse GetAllUserBatch(int? page = 1)
    {
        var (users, hasNext) = GetAllUsers(page);
        int? nextPage = hasNext ? page + 1 : null;
        return  new UserBatchResponse(users, (int)page!, nextPage);
    }



}