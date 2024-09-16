using System.ComponentModel.DataAnnotations;

namespace Backend.Models;
    public class Description
    {
        [Key]
        public int Id {get; set;}
        public List<Tag> Tags {get; } = [];
        [Required]
        public string Text {get; set;} = null!;
    }
