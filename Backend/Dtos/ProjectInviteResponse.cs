using Backend.Models;

namespace Backend.Dtos;

public record ProjectInviteResponse(string UserId, int ProjectId, bool Accepted)
{

 public static implicit operator ProjectInviteResponse(ProjectInvite projectInvite)
    {
        var projectId =  projectInvite.Project.Id;
        var userId =  projectInvite.User.ClerkId;


        return new ProjectInviteResponse(
            userId,
            projectId,
            projectInvite.Accepted
        );

    }

}
