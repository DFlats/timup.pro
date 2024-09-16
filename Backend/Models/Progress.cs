using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class Progress
    {
        [Key]
        public int Id { get; set; }
        public bool IsCompleted {get; set;} = false;
    }
}