using Backend.Database;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PopulatesController(DatabaseContext db) : ControllerBase
{
    [HttpPost("PopulateDatabase")]
    [ProducesResponseType(typeof(bool), 200)]
    public IActionResult PopulateDatabase()
    {
        return Ok(db.PopulateDatabase());
    }
}