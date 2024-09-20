using Backend.Database;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransactionsController(DatabaseContext db) : ControllerBase
{
    [HttpPut("HandleJoinProjectRequest/{userId}/{projectId}")]
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

    [HttpPost("HandleJoinProjectRequest/Accept/{userId}/{projectId}")]
    public IActionResult HandleAcceptJoinProjectInviteRequest(string userId, int projectId)
    {
        return db.HandleAcceptProjectInviteRequest(userId, projectId) switch
        {
            DbErrorStatusCodes.UserNotFound => NotFound("User not found"),
            DbErrorStatusCodes.ProjectNotFound => NotFound("Project not found"),
            DbErrorStatusCodes.UserAlreadyInProject => Conflict("User already in project"),
            DbErrorStatusCodes.UserIsAlreadyOwner => Conflict("User is owner of the project"),
            DbErrorStatusCodes.UserNotFoundInProject => NotFound("User not found in project"),
            DbErrorStatusCodes.Ok => Ok("User accepted p    roject invite"),
            _ => StatusCode(500),
        };
    }

    [HttpPost("HandleJoinProjectRequest/Deny/{userId}/{projectId}")]
    public IActionResult HandleDeclineProjectInviteRequest(string userId, int projectId)
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

    [HttpPut("HandleLeaveProjectRequest/{userId}/{projectId}")]
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

    [HttpPut("HandleKickUserFromProject/{userId}/{projectId}")]
    public IActionResult HandleKickUserFromProject(string userId, int projectId)
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

    [HttpPost("HandleInviteUserToProject/{userId}/{projectId}")]
    public IActionResult HandleInviteUserToProject(string userId, int projectId)
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

    [HttpPost("HandleInviteUserToProject/Accept/{userId}/{projectId}")]
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

    [HttpPost("HandleInviteUserToProject/Deny/{userId}/{projectId}")]
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

}