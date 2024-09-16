using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class Tag
    {
        [Key]
        public int Id {get; set;}
        [Required]
        public string TagValue {get; set;} = null!;
        public List<Project> Projects {get;} = [];
    }
}