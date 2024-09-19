using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos;

public record UserPatchRequest(
    [Required]
    string ClerkId,
    string[]? SkillTags,
    string[]? InterestTags
);
