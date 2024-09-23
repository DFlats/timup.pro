using Backend.Dtos;
using Backend.Models;
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

}