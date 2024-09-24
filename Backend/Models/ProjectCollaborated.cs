
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class ProjectCollaborated
    {
        [Key]
        public int Id {get; set;}
        [Required]
        public int ProjectId {get; set;} 
        [Required]
        public Project Project {get; set;} = null!;
    }
}