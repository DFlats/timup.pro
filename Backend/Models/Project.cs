using System.ComponentModel.DataAnnotations;
using Backend.Controllers;
using Backend.Dtos;

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
    public string AuthorId { get; set; } = null!;
    [Required]
    public List<User> Collaborators { get; } = [];
    [Required]
    public Description Description { get; set; } = null!;
    public Progress Progress { get; set; } = new Progress();
}
