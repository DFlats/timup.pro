namespace Backend.Dtos;

public record ProjectRequest(string AuthorId, string Title, string Description)
{

    // public static implicit operator Project(ProjectRequest projectRequest)
    // {
        
    //     return new Project(
    //         projectRequest.Title,



    //     );
    // }
}
