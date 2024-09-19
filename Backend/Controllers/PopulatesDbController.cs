using Backend.Database;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PopulatesController(DatabaseContext db) : ControllerBase
{
    [HttpPost("PopulateDatabase")]
    public IActionResult PopulateDatabase()
    {
        return Ok(db.PopulateProjects());
    }
}