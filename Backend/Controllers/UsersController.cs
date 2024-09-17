using Backend.Database;
using Backend.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController(DatabaseContext db) : ControllerBase
{

    [HttpGet("{id}")]
    public ActionResult<UserResponse> GetUserById(string id)
    {
        var user = db.GetUserById(id);
        if (user is null) return NotFound("User not found");
        return user;
    }

    [HttpPost("AddTag/{id}")]
    public IActionResult AddTagToUser(string id, TagRequest tagToAdd)
    {
        var success = db.AddTagToUser(id, tagToAdd);
        if (success)
        {
            db.SaveChanges();
            return Ok();
        }
        return NotFound();
    }

    [HttpDelete("RemoveTag/{id}")]
    public IActionResult RemoveTagFromUser(string id, TagRequest tagToRemove)
    {
        var success = db.RemoveTagFromUser(id, tagToRemove);
        if (success)
        {
            db.SaveChanges();
            return Ok();
        }
        return NotFound();
    }
}
