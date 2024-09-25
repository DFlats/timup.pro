namespace Backend.Dtos;
public record ProjectBatchResponse
{
    public List<ProjectResponse> ProjectResponses { get; init; } = [];
    public int CurrentPage { get; init; } = 0;
    public int? NextPage { get; init; } = null;
    public ProjectBatchResponse(List<ProjectResponse> projectResponses, int currentPage, int? nextPage)
    {
        ProjectResponses = projectResponses;
        CurrentPage = currentPage;
        NextPage = nextPage;
    }

    public ProjectBatchResponse()
    {

    }
}
