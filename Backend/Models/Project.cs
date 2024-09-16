using System.ComponentModel.DataAnnotations;

namespace Backend.Models;
public class Project
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Title { get; set; } = null!;
    [Required]
    public User Author { get; init; } = null!;
    [Required]
    public string AuthorId { get; init; } = null!;
    [Required]
    public List<User> Collaborators { get; } = [];
    [Required]
    public Description Description { get; set; } = null!;
    public Progress Progress { get; set; } = new Progress();
}
