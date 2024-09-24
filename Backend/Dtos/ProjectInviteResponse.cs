using Backend.Models;

namespace Backend.Dtos;

public record ProjectInviteResponse(UserResponse User, ProjectResponse Project, bool Accepted)
{

 public static implicit operator ProjectInviteResponse(ProjectInvite projectInvite)
    {
        var project = (ProjectResponse) projectInvite.Project;
        var user = (UserResponse) projectInvite.User;


        return new ProjectInviteResponse(
            user,
            project,
            projectInvite.Accepted
        );

    }

}
