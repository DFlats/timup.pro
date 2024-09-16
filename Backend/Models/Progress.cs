using System.ComponentModel.DataAnnotations;

namespace Backend.Models;
    public class Progress
    {
        [Key]
        public int Id { get; set; }
        public bool IsCompleted {get; set;} = false;
    }
