using Backend.Database;
using Backend.Dtos;
using Backend.Models;
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
        return (UserResponse)user;
    }

    [HttpPost]
    public IActionResult AddUser(UserRequest userToAdd)
    {
        var user = db.GetUserById(userToAdd.ClerkId);
        if (user is not null)
        {
            return Conflict("User already exists");
        }

        var newUser = db.AddUser(userToAdd);
        return CreatedAtAction(nameof(GetUserById), new { id = newUser.ClerkId }, (UserResponse)newUser);
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

    [HttpGet("RecommendedUsers/{projectId}")]
    public ActionResult<List<UserResponse>> GetRecommendedUsersByProjectId(int projectId)
    {
        var res = db.GetRecommendedUsersByProjectId(projectId);
        if (res.Item1 == DatabaseContext.Statuses.ProjectNotFound) return NotFound("Project not found");
        return res.Item2!.Select(u => (UserResponse)u).ToList();
    }
}
