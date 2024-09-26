using Backend.Database;

namespace Backend.Dtos.Internal;

internal record ProjectBatchDbResponse()
{
    public DbErrorStatusCodes DbErrorStatusCode { get; set; }
    public ProjectBatchResponse ProjectBatchResponse { get; set; } = new();

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