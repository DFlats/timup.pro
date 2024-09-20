using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos;

public record TagRequest(
    [Required]
    string TagName,
    [Required]
    bool IsSkill
);
