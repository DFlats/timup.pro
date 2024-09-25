using Backend.Database;
using Backend.Models;

namespace Backend.Dtos.Internal;

internal record ProjectsDbResponse()
{
    public DbErrorStatusCodes DbErrorStatusCode { get; init; }
    public Project[] Projects { get; init; } = [];
    public bool HasNext { get; init; }

    public ProjectsDbResponse(DbErrorStatusCodes dbErrorStatusCode, Project[]? projects, bool hasNext = false) 
        : this()
    {
        DbErrorStatusCode = dbErrorStatusCode;
        Projects = projects ?? [];
        HasNext = hasNext;
    }
}