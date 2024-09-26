using Backend.Dtos;
using Backend.Dtos.Internal;
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

    internal ProjectBatchDbResponse GetRecommendedProjectBatchByUserId(string id, int? page = 1)
    {
        var user = GetUserById(id);

        if (user is null) return new ProjectBatchDbResponse(DbErrorStatusCodes.UserNotFound, null);

        var interests = user.Tags.Where(t => t.IsSkill == false).Select(t => t.TagValue).ToArray();
        var skills = user.Tags.Where(t => t.IsSkill == true).Select(t => t.TagValue).ToArray();

        int projectsCount = Projects
            .Include(p => p.Author)
            .Include(p => p.Description)
            .ThenInclude(p => p.Tags)
            .Where(p => p.Description.Tags.Any(t => skills.Contains(t.TagValue) && t.IsSkill || interests.Contains(t.TagValue) && !t.IsSkill))
            .Count();

        var projectsDbResponse = GetRecommendedProjectsByUserId(id, page);

        return projectsDbResponse.DbErrorStatusCode switch
        {
            DbErrorStatusCodes.UserNotFound => new ProjectBatchDbResponse(DbErrorStatusCodes.UserNotFound, null),
            DbErrorStatusCodes.Ok => new ProjectBatchDbResponse(DbErrorStatusCodes.Ok, new ProjectBatchResponse(
                projectsDbResponse.Projects.Select(p => (ProjectResponse)p).ToList(),
                (int)page!,
                projectsCount / _pageSize > page ? page + 1 : null)
            ),
            _ => new ProjectBatchDbResponse(DbErrorStatusCodes.FatalError, null)
        };
    }

    internal (DbErrorStatusCodes, UserBatchResponse?) GetRecommendedUserBatchByProjectId(int id, int? page = 1)
    {
        var project = GetProjectById(id);

        if (project is null) return (DbErrorStatusCodes.ProjectNotFound, null);

        var interests = project.Description.Tags.Where(t => t.IsSkill == false).Select(t => t.TagValue).ToArray();
        var skills = project.Description.Tags.Where(t => t.IsSkill == true).Select(t => t.TagValue).ToArray();
        var collaborators = project.Collaborators.Select(c => c.User.ClerkId).ToArray();
        var invitedUsers = project.ProjectInvites.Select(p => p.User.ClerkId).ToArray();


        int usersCount = Users
            .Include(u => u.Tags)
            .Where(u => u.Tags.Any(t => skills.Contains(t.TagValue) && t.IsSkill || interests.Contains(t.TagValue) && !t.IsSkill) && !collaborators.Contains(u.ClerkId) && u.ClerkId != project.Author.ClerkId && !invitedUsers.Contains(u.ClerkId))
            .Count();


        var usersDbResponse = GetRecommendedUsersByProjectId(id, page);

        return usersDbResponse.DbErrorStatusCode switch
        {
            DbErrorStatusCodes.ProjectNotFound => (DbErrorStatusCodes.UserNotFound, null),
            DbErrorStatusCodes.Ok => (DbErrorStatusCodes.Ok, new UserBatchResponse(
                usersDbResponse.Users.Select(u => (UserResponse)u).ToList(),
                (int)page!,
                usersCount / _pageSize > page ? page + 1 : null)
            ),
            _ => (DbErrorStatusCodes.FatalError, null)
        };
    }

    internal ProjectBatchDbResponse GetProjectBatchByUserId(string id, int? page)
    {
        var projectsDbResponse = GetProjectsByUserId(id, page);
        if (projectsDbResponse.DbErrorStatusCode != DbErrorStatusCodes.Ok) return new ProjectBatchDbResponse(projectsDbResponse.DbErrorStatusCode, null);
        var projectResponses = projectsDbResponse.Projects.Select(p => (ProjectResponse)p).ToList();
        int? nextPage = projectsDbResponse.HasNext ? page + 1 : null;
        int CurrentPage = (int)page!;
        return new ProjectBatchDbResponse(DbErrorStatusCodes.Ok, new ProjectBatchResponse(projectResponses, (int)page!, nextPage));
    }

    internal UserBatchResponse GetUserBatchByFilter(string[]? skills, string[]? interests, int? page = 1)
    {
        var usersDbResponse = GetUsersByFilter(skills, interests, page);
        int? nextPage = usersDbResponse.HasNext ? page + 1 : null;
        return new UserBatchResponse(usersDbResponse.Users.Select(u => (UserResponse)u).ToList(), (int)page!, nextPage);
    }

    internal UserBatchResponse GetAllUserBatch(int? page = 1)
    {
        var usersDbResponse = GetAllUsers(page);
        int? nextPage = usersDbResponse.HasNext ? page + 1 : null;
        return new UserBatchResponse(usersDbResponse.Users.Select(u => (UserResponse)u).ToList(), (int)page!, nextPage);
    }

}