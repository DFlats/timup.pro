using Backend.Database;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransactionsController(DatabaseContext db) : ControllerBase
{
    [HttpPost("JoinProjectRequestByUserIdAndProjectId/{userId}/{projectId}")]
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
            DbErrorStatusCodes.Ok => Ok("User joined project"),
            _ => StatusCode(500),
        };
    }

    [HttpPut("JoinProjectRequestByUserIdProjectIdAndAuthorId/Accept/{userId}/{projectId}/{authorId}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(401)]
    [ProducesResponseType(409)]
    [ProducesResponseType(500)]
    public IActionResult HandleAcceptJoinProjectInviteRequest(string userId, int projectId, string authorId)
    {
        return db.HandleAcceptProjectInviteRequest(userId, projectId) switch
        {
            DbErrorStatusCodes.UserNotFound => NotFound("User not found"),
            DbErrorStatusCodes.ProjectNotFound => NotFound("Project not found"),
            DbErrorStatusCodes.UserAlreadyInProject => Conflict("User already in project"),
            DbErrorStatusCodes.UserIsAlreadyOwner => Conflict("User is owner of the project"),
            DbErrorStatusCodes.UserNotFoundInProject => NotFound("User not found in project"),
            DbErrorStatusCodes.Ok => Ok("User accepted project invite"),
            _ => StatusCode(500),
        };
    }

    [HttpPut("JoinProjectRequestByUserIdProjectIdAndAuthorId/Deny/{userId}/{projectId}/{authorId}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(401)]
    [ProducesResponseType(500)]
    public IActionResult HandleDeclineProjectInviteRequest(string userId, int projectId, string authorId)
    {
        return db.HandleDeclineProjectInviteRequest(userId, projectId) switch
        {
            DbErrorStatusCodes.UserNotFound => NotFound("User not found"),
            DbErrorStatusCodes.ProjectNotFound => NotFound("Project not found"),
            DbErrorStatusCodes.UserNotFoundInProject => NotFound("User not found in project"),
            DbErrorStatusCodes.Ok => Ok("User declined project invite"),
            _ => StatusCode(500),
        };
    }

    [HttpPost("InviteUserToProjectByUserIdProjectIdAndAuthorId/{userId}/{projectId}/{authorId}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(401)]
    [ProducesResponseType(409)]
    [ProducesResponseType(500)]
    public IActionResult HandleInviteUserToProject(string userId, int projectId, string authorId)
    {
        return db.InviteToProject(userId, projectId) switch
        {
            DbErrorStatusCodes.UserNotFound => NotFound("User not found"),
            DbErrorStatusCodes.ProjectNotFound => NotFound("Project not found"),
            DbErrorStatusCodes.UserAlreadyInProject => Conflict("User already in project"),
            DbErrorStatusCodes.UserIsAlreadyOwner => Conflict("User is owner of the project"),
            DbErrorStatusCodes.Ok => Ok("User invited to project"),
            _ => StatusCode(500),
        };
    }

    [HttpPut("InviteUserToProjectByUserIdAndProjectId/Accept/{userId}/{projectId}")]
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
            DbErrorStatusCodes.Ok => Ok("User accepted project invite"),
            _ => StatusCode(500),
        };
    }

    [HttpPut("InviteUserToProjectByUserIdAndProjectId/Deny/{userId}/{projectId}")]
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
            DbErrorStatusCodes.Ok => Ok("User declined project invite"),
            _ => StatusCode(500),
        };
    }

    [HttpDelete("LeaveProjectRequestByUserIdAndProjectId/{userId}/{projectId}")]
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
            DbErrorStatusCodes.Ok => Ok("User left project"),
            _ => StatusCode(500),
        };
    }

    [HttpDelete("KickUserFromProjectByUserIdProjectIdAndAuthorId/{userId}/{projectId}/{authorId}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(401)]
    [ProducesResponseType(409)]
    [ProducesResponseType(500)]
    public IActionResult HandleKickUserFromProject(string userId, int projectId, string authorId)
    {
        return db.HandleKickUserRequest(userId, projectId) switch
        {
            DbErrorStatusCodes.UserNotFound => NotFound("User not found"),
            DbErrorStatusCodes.ProjectNotFound => NotFound("Project not found"),
            DbErrorStatusCodes.UserNotFoundInProject => NotFound("User not found in project"),
            DbErrorStatusCodes.UserIsAlreadyOwner => Conflict("User is owner of the project"),
            DbErrorStatusCodes.Ok => Ok("User kicked from project"),
            _ => StatusCode(500),
        };
    }
}