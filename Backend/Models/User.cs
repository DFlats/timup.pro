using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models;
    public class User
    {
        [Key, Required]
        public string ClerkId {get; init;} = null!;
        [Required]
        public string Name {get; set;} = null!;
        [Required]
        public string Email {get; set;} = null!;
        public List<Project> Projects {get; } = [];
        public List<Tag> Tags = [];

    }
