using Backend.Database;
using Backend.Models;

namespace Backend.Dtos.Internal;

internal record ProjectDbResponse()
{
    public DbErrorStatusCodes DbErrorStatusCode { get; init; }
    public Project? Project { get; init; }

    public ProjectDbResponse(DbErrorStatusCodes dbErrorStatusCode, Project? project) : this()
    {
        DbErrorStatusCode = dbErrorStatusCode;
        Project = project;
    }
}