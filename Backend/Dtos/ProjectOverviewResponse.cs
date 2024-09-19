using Backend.Models;

namespace Backend.Dtos;

public record ProjectOverviewResponse(int Id, string Title, string AuthorId, int CollabCount, string Description, string[] SkillTags, string[] InterestTags, bool IsCompleted)
{
    public static implicit operator ProjectOverviewResponse(Project project)
    {

        var skillTags = project.Description.Tags.Where(t => t.IsSkill == true).Select(t => t.TagValue).ToArray();
        var interestTags = project.Description.Tags.Where(t => t.IsSkill == false).Select(t => t.TagValue).ToArray();
        var collabCount = project.Collaborators.Count;

        return new ProjectOverviewResponse(
            project.Id,
            project.Title,
            project.AuthorId,
            collabCount,
            project.Description.Text,
            skillTags,
            interestTags,
            project.Progress.IsCompleted
        );

    }
}