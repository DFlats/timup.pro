using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos;

public record ProjectRequest(
    [Required]
    string AuthorId,
    [Required]
    string Title,
    [Required]
    string Description
);
