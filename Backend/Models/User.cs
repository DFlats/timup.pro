using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models;
public class User
{
    [Key, Required]
    public string ClerkId { get; set; } = null!;
    [Required]
    public string Name { get; set; } = null!;
    [Required]
    public string Email { get; set; } = null!;
    public virtual List<Project> Projects { get; set; } = [];
    public List<Tag> Tags { get; set; } = [];
    public List<ProjectInvite> ProjectInvites { get; set; } = [];
}
