using Backend.Database;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransactionsController(DatabaseContext db) : ControllerBase
{
    [HttpGet("HandleJoinProjectRequest/{userId}/{projectId}")]
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

    [HttpGet("HandleLeaveProjectRequest/{userId}/{projectId}")]
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

    [HttpGet("HandleKickUserRequest/{userId}/{projectId}")]
    public IActionResult HandleKickUserRequest(string userId, int projectId)
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

    [HttpGet("InviteToProject/{userId}/{projectId}")]
    public IActionResult InviteToProject(string userId, int projectId)
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

}