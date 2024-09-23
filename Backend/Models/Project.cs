using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models;
public class Project
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Title { get; set; } = null!;
    [Required]
    public User Author { get; set; } = null!;
    [Required]
    [ForeignKey("AuthorId")]
    public string AuthorId { get; set; } = null!;
    [Required]
    public virtual List<User> Collaborators { get; } = [];
    [Required]
    public Description Description { get; set; } = null!;
    public Progress Progress { get; set; } = new Progress();
    public List<ProjectInvite> ProjectInvites { get; set; } = [];
}
