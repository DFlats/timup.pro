using System.ComponentModel.DataAnnotations;

public record UserRequest(
    [Required]
    string ClerkId,
    [Required]
    string Name,
    [Required]
    string Email
);