using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class Projects
{
    [Key]
    public string ProjectId { get; set; } = null!;
    [Required]
    public Project Project { get; set; } = null!;
}