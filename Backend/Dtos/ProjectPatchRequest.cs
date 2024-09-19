using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos;

public record ProjectPatchRequest(
    [Required]
    int ProjectId,
    [Required]
    string AuthorId,
    string? Title,
    string? Description,
    string[]? SkillTags,
    string[]? InterestTags,
    bool? IsCompleted
);
