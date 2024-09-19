using Backend.Database;
using Backend.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController(DatabaseContext db) : ControllerBase
{
    [HttpGet("GetUserByUserId/{id}")]
    public ActionResult<UserResponse> GetUserByUserId(string id)
    {
        var user = db.GetUserById(id);
        if (user is null) return NotFound("User not found");
        return (UserResponse)user;
    }

    [HttpPost("CreateUser")]
    public IActionResult CreateUser(UserRequest userToAdd)
    {
        (var status, var user) = db.CreateUser(userToAdd);

        return status switch
        {
            DbErrorStatusCodes.UserAlreadyExists => Conflict("User already exists"),
            DbErrorStatusCodes.Ok => CreatedAtAction(nameof(GetUserByUserId), new { id = user!.ClerkId }, (UserResponse)user),
            _ => StatusCode(500),
        };
    }

    [HttpPost("AddTagToUserByUserId/{id}")]
    public IActionResult AddTagToUserByUserId(string id, TagRequest tagToAdd)
    {
        return db.AddTagToUser(id, tagToAdd) switch
        {
            DbErrorStatusCodes.UserNotFound => NotFound("User not found"),
            DbErrorStatusCodes.TagAlreadyExists => Conflict("Tag already exists"),
            DbErrorStatusCodes.Ok => Ok("Tag added"),
            _ => StatusCode(500),
        };
    }

    [HttpDelete("RemoveTagFromUserByUserId/{id}")]
    public IActionResult RemoveTagFromUserByUserId(string id, TagRequest tagToRemove)
    {
        return db.RemoveTagFromUser(id, tagToRemove) switch
        {
            DbErrorStatusCodes.UserNotFound => NotFound("User not found"),
            DbErrorStatusCodes.TagNotFound => NotFound("Tag not found"),
            DbErrorStatusCodes.Ok => Ok("Tag removed"),
            _ => StatusCode(500),
        };
    }

    [HttpGet("GetRecommendedUsersByProjectId/{id}")]
    public ActionResult<List<UserResponse>> GetRecommendedUsersByProjectId(int id)
    {
        (var status, var users) = db.GetRecommendedUsersByProjectId(id);

        return status switch
        {
            DbErrorStatusCodes.ProjectNotFound => NotFound("Project not found"),
            DbErrorStatusCodes.Ok => users!.Select(u => (UserResponse)u).ToList(),
            _ => StatusCode(500),
        };
    }

    [HttpPatch("UpdateUser")]
    public IActionResult UpdateUser(UserPatchRequest requestBody)
    {
        return db.UpdateUser(requestBody) switch
        {
            DbErrorStatusCodes.UserNotFound => NotFound("User not found"),
            DbErrorStatusCodes.NoContent => NoContent(),
            _ => StatusCode(500),
        };
    }
}
