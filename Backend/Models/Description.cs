using System.ComponentModel.DataAnnotations;

namespace Backend.Models;
public class Description
{
    [Key]
    public int Id { get; set; }
    public List<Tag> SkillTags { get; set; } = [];
    public List<Tag> InterestTags { get; set; } = [];

    [Required]
    public string Text { get; set; } = null!;
}
