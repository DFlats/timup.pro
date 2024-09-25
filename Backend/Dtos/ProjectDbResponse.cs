using Backend.Database;
using Backend.Models;

namespace Backend.Dtos;

internal record ProjectDbResponse(DbErrorStatusCodes DbErrorStatusCode, Project? Project)
{
    DbErrorStatusCodes DbErrorStatusCode { get; init; } = DbErrorStatusCode;
    Project? Project { get; init; } = Project;
}