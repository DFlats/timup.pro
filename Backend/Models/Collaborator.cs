using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class Collaborator
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string UserId { get; set; } = null!;
    [Required]
    public User User { get; set; } = null!;
}