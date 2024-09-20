using Backend.Database;
using Backend.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController(DatabaseContext db) : ControllerBase
{
    [HttpGet("GetUsers")]
    [ProducesResponseType(typeof(List<UserResponse>), 200)]
    public List<UserResponse> GetUsers
    (
        [FromQuery(Name = "interests")] string[]? interests,
        [FromQuery(Name = "skills")] string[]? skills,
        [FromQuery(Name = "page")] int? page = 1
    )
    {
        if (skills?.Length == 0 && interests?.Length == 0)
        {
            return db.GetAllUsers(page);
        }

        return db.GetUsersByFilter(skills, interests, page);
    }

    [HttpGet("GetRecommendedUsersByProjectId/{projectId}")]
    [ProducesResponseType(typeof(List<UserResponse>), 200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(500)]
    public ActionResult<List<UserResponse>> GetRecommendedUsersByProjectId(int projectId, [FromQuery(Name = "page")] int? page = 1)
    {
        (var status, var users) = db.GetRecommendedUsersByProjectId(projectId, page);

        return status switch
        {
            DbErrorStatusCodes.ProjectNotFound => NotFound("Project not found"),
            DbErrorStatusCodes.Ok => users!.Select(u => (UserResponse)u).ToList(),
            _ => StatusCode(500),
        };
    }

    [HttpGet("GetUserByUserId/{userId}")]
    [ProducesResponseType(typeof(UserResponse), 200)]
    [ProducesResponseType(404)]
    public ActionResult<UserResponse> GetUserByUserId(string userId)
    {
        var user = db.GetUserById(userId);
        if (user is null) return NotFound("User not found");
        return (UserResponse)user;
    }

    [HttpPost("CreateUser")]
    [ProducesResponseType(typeof(UserResponse), 201)]
    [ProducesResponseType(409)]
    [ProducesResponseType(500)]
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

    [HttpPatch("UpdateUser")]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(500)]
    public IActionResult UpdateUser(UserPatchRequest requestBody)
    {
        return db.UpdateUser(requestBody) switch
        {
            DbErrorStatusCodes.UserNotFound => NotFound("User not found"),
            DbErrorStatusCodes.Ok => Ok("User updated"),
            _ => StatusCode(500),
        };
    }

    [HttpDelete("DeleteUserByUserId/{userId}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(500)]
    public IActionResult DeleteUser(string userId)
    {
        return db.DeleteUser(userId) switch
        {
            DbErrorStatusCodes.UserNotFound => NotFound("User not found"),
            DbErrorStatusCodes.Ok => Ok("User deleted"),
            _ => StatusCode(500),
        };
    }
}
