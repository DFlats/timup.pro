using Backend.Database;
using Backend.Models;

namespace Backend.Dtos.Internal;

internal record ProjectBatchDbResponse()
{
    public DbErrorStatusCodes DbErrorStatusCode { get; init; }
    public ProjectBatchResponse ProjectBatchResponse { get; init; } = new();

    public ProjectBatchDbResponse(DbErrorStatusCodes dbErrorStatusCode, ProjectBatchResponse? projectBatchResponse) : this()
    {
        DbErrorStatusCode = dbErrorStatusCode;
        ProjectBatchResponse = projectBatchResponse ?? new ProjectBatchResponse(
            [],
            0,
            null
        );
    }

}