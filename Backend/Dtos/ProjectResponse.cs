using Backend.Models;

namespace Backend.Dtos;

public record ProjectResponse(int Id, string Title, string AuthorName, string AuthorId, CollaboratorsResponse[] Collaborators, string Description, string[] SkillTags, string[] InterestTags, bool IsCompleted, string[] InvitedUsers)
{
    public static implicit operator ProjectResponse(Project project)
    {
        var collaborators = project.Collaborators.Select(c => new CollaboratorsResponse(c.ClerkId, c.Name)).ToArray();
        var skillTags = project.Description.Tags.Where(t => t.IsSkill == true).Select(t => t.TagValue).ToArray();
        var interestTags = project.Description.Tags.Where(t => t.IsSkill == false).Select(t => t.TagValue).ToArray();

        var invitedUsers = project.ProjectInvites.Select(i => i.User.ClerkId).ToArray();

        return new ProjectResponse(
            project.Id,
            project.Title,
            project.Author.Name,
            project.AuthorId,
            collaborators,
            project.Description.Text,
            skillTags,
            interestTags,
            project.Progress.IsCompleted,
            invitedUsers
        );

    }
}
