using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class Description
    {
        public List<Tag> Tags {get; } = [];
        [Required]
        public string Text {get; set;} = null!;
    }
}