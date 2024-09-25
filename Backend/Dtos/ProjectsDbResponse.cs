using Backend.Database;
using Backend.Models;

namespace Backend.Dtos;

internal record ProjectsDbResponse(DbErrorStatusCodes DbErrorStatusCode, Project[]? Projects, bool HasNext = false)
{
    DbErrorStatusCodes DbErrorStatusCode { get; init; } = DbErrorStatusCode;
    Project[] Project { get; init; } = Projects ?? [];
    bool HasNext { get; init; } = HasNext;
}