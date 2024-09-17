using Backend.Models;

namespace Backend.Dtos;

public record ProjectResponse(int Id, string Title, string AuthorName, string AuthorId, (string, string)[] Collaborators, string Description, string[] SkillTags, string[] InterestTags, bool IsCompleted)
{
    public static implicit operator ProjectResponse(Project project)
    {

        var collaborators = project.Collaborators.Select(c => (c.Name, c.ClerkId)).ToArray();
        var skillTags = project.Description.SkillTags.Select(t => t.TagValue).ToArray();
        var interestTags = project.Description.InterestTags.Select(t => t.TagValue).ToArray();

        return new ProjectResponse(
            project.Id,
            project.Title,
            project.Author.Name,
            project.AuthorId,
            collaborators,
            project.Description.Text,
            skillTags,
            interestTags,
            project.Progress.IsCompleted
        );

    }
}
