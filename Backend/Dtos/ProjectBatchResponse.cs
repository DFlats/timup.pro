namespace Backend.Dtos;
public record ProjectBatchResponse(
    List<ProjectResponse> ProjectResponses,
    int CurrentPage,
    int? NextPage
);