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
    public UserBatchResponse GetUsers
    (
        [FromQuery(Name = "interests")] string[]? interests,
        [FromQuery(Name = "skills")] string[]? skills,
        [FromQuery(Name = "page")] int? page = 1
    )
    {
        if (skills?.Length == 0 && interests?.Length == 0)
        {
            return db.GetAllUserBatch(page);
        }

        return db.GetUserBatchByFilter(skills, interests, page);
    }

    [HttpGet("GetRecommendedUsers/{projectId}")]
    [ProducesResponseType(typeof(UserBatchResponse), 200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(500)]
    public ActionResult<UserBatchResponse> GetRecommendedUsersByProjectId(int projectId, [FromQuery(Name = "page")] int? page = 1)
    {
        (var status, var batch) = db.GetRecommendedUserBatchByProjectId(projectId, page);

        return status switch
        {
            DbErrorStatusCodes.ProjectNotFound => NotFound("Project not found"),
            DbErrorStatusCodes.Ok => batch!,
            _ => StatusCode(500),
        };
    }

    [HttpGet("GetUser/{userId}")]
    [ProducesResponseType(typeof(UserResponse), 200)]
    [ProducesResponseType(404)]
    public ActionResult<UserResponse> GetUserByUserId(string userId)
    {
        var user = db.GetUserById(userId);
        if (user is null) return NotFound("User not found");
        return (UserResponse)user;
    }

    [HttpPost("ConfirmUserExists")]
    [ProducesResponseType(typeof(UserResponse), 200)]
    [ProducesResponseType(typeof(UserResponse), 201)]
    [ProducesResponseType(500)]
    public IActionResult ConfirmUserExists(UserRequest userToCheck)
    {
        var userDbResponse = db.CreateUser(userToCheck);

       // if(userDbResponse.DbErrorStatusCode == DbErrorStatusCodes.Ok) db.InviteUserToSomeRandomProjects(userDbResponse.User!.ClerkId);

        return userDbResponse.DbErrorStatusCode switch
        {
            DbErrorStatusCodes.UserAlreadyExists => Ok((UserResponse)db.GetUserById(userToCheck.ClerkId)!),
            DbErrorStatusCodes.Ok => CreatedAtAction(nameof(GetUserByUserId), new { userId = userDbResponse.User!.ClerkId }, (UserResponse)userDbResponse.User),
            DbErrorStatusCodes.FatalError => StatusCode(500),
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
            DbErrorStatusCodes.Ok => NoContent(),
            _ => StatusCode(500),
        };
    }

    [HttpDelete("DeleteUser/{userId}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(500)]
    public IActionResult DeleteUser(string userId)
    {
        return db.DeleteUser(userId) switch
        {
            DbErrorStatusCodes.UserNotFound => NotFound("User not found"),
            DbErrorStatusCodes.Ok => NoContent(),
            _ => StatusCode(500),
        };
    }

    [HttpPut("PutUserImageUrl/{userId}")]
    public IActionResult PutImageOnUser(string userId, [FromBody] string ImageUrl)
    {
        return db.PutImageOnUser(userId, ImageUrl) switch {
            DbErrorStatusCodes.UserNotFound => NotFound("User not found"),
            DbErrorStatusCodes.Ok => NoContent(),
            _ => StatusCode(500)
        };
    }

}
