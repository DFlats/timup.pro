namespace Backend.Dtos;
public record UserBatchResponse(List<UserResponse> UserResponses, int CurrentPage, int? NextPage)
{

}
