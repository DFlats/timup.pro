using Azure.Messaging;
using Backend.Database;
using Backend.Dtos;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController(DatabaseContext db) : ControllerBase
{
    [HttpGet("GetProjects")]
    [ProducesResponseType(typeof(ProjectBatchResponse), 200)]
    public ProjectBatchResponse GetProjectBatch
    (
        [FromQuery(Name = "interests")] string[]? interests,
        [FromQuery(Name = "skills")] string[]? skills,
        [FromQuery(Name = "page")] int? page = 1
    )
    {
        if (skills?.Length == 0 && interests?.Length == 0)
        {
            return db.GetProjectBatch(page);
        }

        return db.GetProjectBatchByFilter(skills, interests, page);
    }

    [HttpGet("GetRecommendedProjects/{userId}")]
    [ProducesResponseType(typeof(ProjectBatchResponse), 200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(500)]
    public ActionResult<ProjectBatchResponse> GetRecommendedProjectsBatchByUserId(string userId, [FromQuery(Name = "page")] int? page = 1)
    {
        var projectBatchDbResponse = db.GetRecommendedProjectBatchByUserId(userId, page);

        return projectBatchDbResponse.DbErrorStatusCode switch
        {
            DbErrorStatusCodes.UserNotFound => NotFound("User not found"),
            DbErrorStatusCodes.Ok => projectBatchDbResponse.ProjectBatchResponse,
            _ => StatusCode(500),
        };
    }

    [HttpGet("GetProject/{projectId}")]
    [ProducesResponseType(typeof(ProjectResponse), 200)]
    [ProducesResponseType(404)]
    public ActionResult<ProjectResponse> GetProjectByProjectId(int projectId)
    {
        var res = db.GetProjectById(projectId);
        if (res == null) return NotFound("Project was not found");
        return (ProjectResponse)res;
    }

    [HttpGet("GetOwnedProjects/{userId}")]
    [ProducesResponseType(typeof(ProjectBatchResponse), 200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(500)]
    public ActionResult<ProjectBatchResponse> GetProjectsByUserId(string userId, [FromQuery(Name = "page")] int? page = 1)
    {
        var projectBatchDbResponse = db.GetProjectBatchByUserId(userId, page);

        return projectBatchDbResponse.DbErrorStatusCode switch
        {
            DbErrorStatusCodes.UserNotFound => NotFound("User not found"),
            DbErrorStatusCodes.Ok => projectBatchDbResponse.ProjectBatchResponse,
            _ => StatusCode(500),
        };
    }

    [HttpPost("CreateProject")]
    [ProducesResponseType(typeof(ProjectResponse), 201)]
    [ProducesResponseType(404)]
    [ProducesResponseType(500)]
    public ActionResult<ProjectResponse> CreateProject(ProjectRequest projectRequest)
    {
        var projectDbResponse = db.CreateProject(projectRequest);

        return projectDbResponse.DbErrorStatusCode switch
        {
            DbErrorStatusCodes.UserNotFound => NotFound("Could not find a user for given project"),
            DbErrorStatusCodes.Ok => Ok((ProjectResponse)projectDbResponse.Project!),
            _ => StatusCode(500),
        };
    }

    [HttpPatch("UpdateProject")]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(401)]
    [ProducesResponseType(500)]
    public IActionResult UpdateProject(ProjectPatchRequest requestBody)
    {
        var status = db.UpdateProject(requestBody);

        return status switch
        {
            DbErrorStatusCodes.UserNotFound => NotFound("User not found"),
            DbErrorStatusCodes.UserNotAuthorized => Unauthorized("User not authorized"),
            DbErrorStatusCodes.Ok => NoContent(),
            _ => StatusCode(500),
        };
    }

    [HttpDelete("DeleteProject/{projectId}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(401)]
    [ProducesResponseType(500)]
    public IActionResult DeleteProject(int projectId)
    {
        var status = db.DeleteProject(projectId);
        return status switch
        {
            DbErrorStatusCodes.ProjectNotFound => NotFound("Project not found"),
            DbErrorStatusCodes.Ok => NoContent(),
            _ => StatusCode(500),
        };
    }
}