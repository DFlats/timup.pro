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
    public List<Project> Projects { get; } = [];
    public List<Tag> SkillTags = [];
    public List<Tag> InterestTags = [];

}
