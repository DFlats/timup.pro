using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Dtos
{
    public record TagRequest(string TagName, bool IsSkill)
    {
        
    }
}