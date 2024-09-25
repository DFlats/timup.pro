using Backend.Models;

namespace Backend.Dtos;

public record ProjectResponse(int Id, string Title, string AuthorName, string AuthorId, CollaboratorsResponse[] Collaborators, string Description, string[] SkillTags, string[] InterestTags, bool IsCompleted, string[] PendingInvites, string[] UserJoinRequests)
{
    public static implicit operator ProjectResponse(Project project)
    {
        var collaborators = project.Collaborators.Select(c => new CollaboratorsResponse(c.User.ClerkId, c.User.Name)).ToArray();
        var skillTags = project.Description.Tags.Where(t => t.IsSkill == true).Select(t => t.TagValue).ToArray();
        var interestTags = project.Description.Tags.Where(t => t.IsSkill == false).Select(t => t.TagValue).ToArray();

        var pendingInvites = project.ProjectInvites.Where(i => i.ProjectAccepted == true).Select(i => i.User.ClerkId).ToArray();
        var joinRequests = project.ProjectInvites.Where(i => i.UserAccepted == true).Select(i => i.User.ClerkId).ToArray();

        return new ProjectResponse(
            project.Id,
            project.Title,
            project.Author.Name,
            project.Author.ClerkId,
            collaborators,
            project.Description.Text,
            skillTags,
            interestTags,
            project.Progress.IsCompleted,
            pendingInvites,
            joinRequests
        );

    }
}
