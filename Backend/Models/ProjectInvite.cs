using System.ComponentModel.DataAnnotations;

namespace Backend.Models;
public class ProjectInvite
{
    [Key]
    public int Id { get; set; }
    [Required]
    public User User { get; set; } = null!;
    [Required]
    public Project Project { get; set; } = null!;
    public bool UserAccepted { get; set; } = false;
    public bool ProjectAccepted { get; set; } = false;
}
