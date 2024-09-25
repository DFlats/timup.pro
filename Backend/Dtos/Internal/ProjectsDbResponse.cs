using Backend.Database;
using Backend.Models;

namespace Backend.Dtos.Internal;

internal record ProjectsDbResponse()
{
    public DbErrorStatusCodes DbErrorStatusCode { get; init; }
    public List<Project> Projects { get; init; } = [];
    public bool HasNext { get; init; }

    public ProjectsDbResponse(DbErrorStatusCodes dbErrorStatusCode, List<Project>? projects, bool hasNext = false) 
        : this()
    {
        DbErrorStatusCode = dbErrorStatusCode;
        Projects = projects ?? [];
        HasNext = hasNext;
    }
}