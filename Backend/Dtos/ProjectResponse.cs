using Backend.Models;

namespace Backend.Dtos;

public record ProjectResponse(int Id, string Title, string AuthorName, string AuthorId, (string, string)[] Collaborators, string Description, string[] Tags, bool IsCompleted)
{
    public static implicit operator ProjectResponse(Project project)
    {

        var collaborators = project.Collaborators.Select(c => (c.Name, c.ClerkId)).ToArray();
        var tags = project.Description.Tags.Select(t => t.TagValue).ToArray();

        return new ProjectResponse(
            project.Id,
            project.Title,
            project.Author.Name,
            project.AuthorId,
            collaborators,
            project.Description.Text,
            tags,
            project.Progress.IsCompleted
        );

    }
}
