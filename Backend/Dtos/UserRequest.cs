using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos;

public record UserRequest(
    [Required]
    string ClerkId,
    [Required]
    string Name,
    [Required]
    string Email
);