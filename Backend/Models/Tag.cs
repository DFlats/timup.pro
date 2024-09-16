using System.ComponentModel.DataAnnotations;

namespace Backend.Models;
public class Tag
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string TagValue { get; set; } = null!;
    public List<Project> Projects { get; } = [];
}
