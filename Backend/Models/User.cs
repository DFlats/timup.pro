using System.ComponentModel.DataAnnotations;

namespace Backend.Models;
public class User
{
    [Key, Required]
    public string ClerkId { get; set; } = null!;
    [Required]
    public string Name { get; set; } = null!;
    [Required]
    public string Email { get; set; } = null!;
    public List<Project> Projects { get; set; } = [];
    public List<Tag> Tags { get; set; } = [];
    public List<ProjectInvite> ProjectInvites { get; set; } = [];
}
