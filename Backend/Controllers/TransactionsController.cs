using Backend.Database;
using Backend.Dtos;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using SQLitePCL;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransactionsController(DatabaseContext db) : ControllerBase
{
    [HttpPost("JoinProjectRequest/{userId}/{projectId}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(409)]
    [ProducesResponseType(500)]
    public IActionResult HandleJoinProjectRequest(string userId, int projectId)
    {
        return db.HandleJoinProjectRequest(userId, projectId) switch
        {
            DbErrorStatusCodes.UserNotFound => NotFound("User not found"),
            DbErrorStatusCodes.ProjectNotFound => NotFound("Project not found"),
            DbErrorStatusCodes.UserAlreadyInProject => Conflict("User already in project"),
            DbErrorStatusCodes.UserIsAlreadyOwner => Conflict("User is already owner"),
            DbErrorStatusCodes.UserAlreadyInvited => Conflict("User is already invited"),
            DbErrorStatusCodes.Ok => NoContent(),
            _ => StatusCode(500),
        };
    }

    [HttpPut("JoinProjectRequest/Accept/{userId}/{projectId}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(409)]
    [ProducesResponseType(500)]
    public IActionResult HandleAcceptJoinProjectInviteRequest(string userId, int projectId)
    {
        return db.HandleAcceptProjectInviteRequest(userId, projectId) switch
        {
            DbErrorStatusCodes.UserNotFound => NotFound("User not found"),
            DbErrorStatusCodes.ProjectNotFound => NotFound("Project not found"),
            DbErrorStatusCodes.UserAlreadyInProject => Conflict("User already in project"),
            DbErrorStatusCodes.UserIsAlreadyOwner => Conflict("User is owner of the project"),
            DbErrorStatusCodes.UserNotFoundInProject => NotFound("User not found in project"),
            DbErrorStatusCodes.Ok => NoContent(),
            _ => StatusCode(500),
        };
    }

    [HttpPut("JoinProjectRequest/Deny/{userId}/{projectId}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(500)]
    public IActionResult HandleDeclineProjectInviteRequest(string userId, int projectId)
    {
        return db.HandleDeclineProjectInviteRequest(userId, projectId) switch
        {
            DbErrorStatusCodes.UserNotFound => NotFound("User not found"),
            DbErrorStatusCodes.ProjectNotFound => NotFound("Project not found"),
            DbErrorStatusCodes.UserNotFoundInProject => NotFound("User not found in project"),
            DbErrorStatusCodes.Ok => NoContent(),
            _ => StatusCode(500),
        };
    }

    [HttpPost("InviteUserToProject/{userId}/{projectId}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(409)]
    [ProducesResponseType(500)]
    public IActionResult HandleInviteUserToProject(string userId, int projectId)
    {
        return db.InviteToProject(userId, projectId) switch
        {
            DbErrorStatusCodes.UserNotFound => NotFound("User not found"),
            DbErrorStatusCodes.ProjectNotFound => NotFound("Project not found"),
            DbErrorStatusCodes.UserAlreadyInProject => Conflict("User already in project"),
            DbErrorStatusCodes.UserAlreadyInvited => Conflict("User already invited"),
            DbErrorStatusCodes.UserIsAlreadyOwner => Conflict("User is owner of the project"),
            DbErrorStatusCodes.Ok => NoContent(),
            _ => StatusCode(500),
        };
    }

    [HttpPut("InviteUserToProject/Accept/{userId}/{projectId}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(409)]
    [ProducesResponseType(500)]
    public IActionResult HandleInviteUserToProjectAccept(string userId, int projectId)
    {
        return db.HandleInviteUserToProjectAccept(userId, projectId) switch
        {
            DbErrorStatusCodes.UserNotFound => NotFound("User not found"),
            DbErrorStatusCodes.ProjectNotFound => NotFound("Project not found"),
            DbErrorStatusCodes.UserAlreadyInProject => Conflict("User already in project"),
            DbErrorStatusCodes.UserIsAlreadyOwner => Conflict("User is owner of the project"),
            DbErrorStatusCodes.UserNotFoundInProject => NotFound("User not found in project"),
            DbErrorStatusCodes.NoInviteFound => NotFound("No invite found"),
            DbErrorStatusCodes.Ok => NoContent(),
            _ => StatusCode(500),
        };
    }

    [HttpPut("InviteUserToProject/Deny/{userId}/{projectId}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(500)]
    public IActionResult HandleInviteUserToProjectDeny(string userId, int projectId)
    {
        return db.HandleInviteUserToProjectDeny(userId, projectId) switch
        {
            DbErrorStatusCodes.UserNotFound => NotFound("User not found"),
            DbErrorStatusCodes.ProjectNotFound => NotFound("Project not found"),
            DbErrorStatusCodes.UserNotFoundInProject => NotFound("User not found in project"),
            DbErrorStatusCodes.NoInviteFound => NotFound("No invite found"),
            DbErrorStatusCodes.Ok => NoContent(),
            _ => StatusCode(500),
        };
    }

    [HttpDelete("LeaveProjectRequest/{userId}/{projectId}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(409)]
    [ProducesResponseType(500)]
    public IActionResult HandleLeaveProjectRequest(string userId, int projectId)
    {
        return db.HandleLeaveProjectRequest(userId, projectId) switch
        {
            DbErrorStatusCodes.UserNotFound => NotFound("User not found"),
            DbErrorStatusCodes.ProjectNotFound => NotFound("Project not found"),
            DbErrorStatusCodes.UserIsAlreadyOwner => Conflict("User is owner of the project"),
            DbErrorStatusCodes.Ok => NoContent(),
            _ => StatusCode(500),
        };
    }

    [HttpDelete("KickUserFromProject/{userId}/{projectId}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(409)]
    [ProducesResponseType(500)]
    public IActionResult HandleKickUserFromProject(string userId, int projectId)
    {
        return db.HandleKickUserRequest(userId, projectId) switch
        {
            DbErrorStatusCodes.UserNotFound => NotFound("User not found"),
            DbErrorStatusCodes.ProjectNotFound => NotFound("Project not found"),
            DbErrorStatusCodes.UserNotFoundInProject => NotFound("User not found in project"),
            DbErrorStatusCodes.UserIsAlreadyOwner => Conflict("User is owner of the project"),
            DbErrorStatusCodes.Ok => NoContent(),
            _ => StatusCode(500),
        };
    }

    [HttpGet("GetInvites/{userId}")]
    public ActionResult<List<int>> GetUserInvites(string userId)
    {
        var (status, invites) = db.GetUserInvites(userId);
        return status switch
        {
            DbErrorStatusCodes.UserNotFound => NotFound("User not found"),
            DbErrorStatusCodes.Ok => invites!.Select(i => ((ProjectInviteResponse)i).ProjectId).ToList(),
            _ => StatusCode(500)
        };
    }

    [HttpGet("GetJoinRequests/{projectId}")]
    public ActionResult<List<string>> GetProjectInvites(int projectId)
    {
        var (status, invites) = db.GetProjectInvites(projectId);
        return status switch
        {
            DbErrorStatusCodes.ProjectNotFound => NotFound("Project not found"),
            DbErrorStatusCodes.Ok => invites!.Select(i => ((ProjectInviteResponse)i).UserId ).ToList(),
            _ => StatusCode(500)
        };
    }
}