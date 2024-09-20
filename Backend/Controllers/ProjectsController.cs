using Azure.Messaging;
using Backend.Database;
using Backend.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController(DatabaseContext db) : ControllerBase
{
    [HttpGet("GetProjects")]
    [ProducesResponseType(typeof(List<ProjectResponse>), 200)]
    public List<ProjectResponse> GetProjects
    (
        [FromQuery(Name = "interests")] string[]? interests,
        [FromQuery(Name = "skills")] string[]? skills,
        [FromQuery(Name = "page")] int? page = 1
    )
    {
        if (skills?.Length == 0 && interests?.Length == 0)
        {
            return db.GetAllProjects(page);
        }

        return db.GetProjectsByFilter(skills, interests, page);
    }

    [HttpGet("GetRecommendedProjectsByUserId/{userId}")]
    [ProducesResponseType(typeof(List<ProjectResponse>), 200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(500)]
    public ActionResult<List<ProjectResponse>> GetRecommendedProjectsByUserId(string userId, [FromQuery(Name = "page")] int? page = 1)
    {
        (var status, var projects) = db.GetRecommendedProjectsByUserId(userId, page);

        return status switch
        {
            DbErrorStatusCodes.UserNotFound => NotFound("User not found"),
            DbErrorStatusCodes.Ok => projects!,
            _ => StatusCode(500),
        };
    }

    [HttpGet("GetProjectByProjectId/{projectId}")]
    [ProducesResponseType(typeof(ProjectResponse), 200)]
    [ProducesResponseType(404)]
    public ActionResult<ProjectResponse> GetProjectByProjectId(int projectId)
    {
        var res = db.GetProjectById(projectId);
        if (res == null) return NotFound("Project was not found");
        return (ProjectResponse)res;
    }

    [HttpGet("GetProjectsByUserId/{userId}")]
    [ProducesResponseType(typeof(List<ProjectOverviewResponse>), 200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(500)]
    public ActionResult<List<ProjectOverviewResponse>> GetProjectsByUserId(string userId)
    {
        (var status, var projects) = db.GetProjectsByUserId(userId);

        return status switch
        {
            DbErrorStatusCodes.UserNotFound => NotFound("User not found"),
            DbErrorStatusCodes.Ok => projects!.Select(p => (ProjectOverviewResponse)p).ToList(),
            _ => StatusCode(500),
        };
    }

    [HttpPost("CreateProject")]
    [ProducesResponseType(typeof(ProjectResponse), 201)]
    [ProducesResponseType(404)]
    [ProducesResponseType(500)]
    public ActionResult<ProjectResponse> CreateProject(ProjectRequest projectRequest)
    {
        (var status, var project) = db.CreateProject(projectRequest);

        return status switch
        {
            DbErrorStatusCodes.UserNotFound => NotFound("Could not find a user for given project"),
            DbErrorStatusCodes.Ok => CreatedAtAction(nameof(GetProjectByProjectId), new { id = project!.Id }, (ProjectResponse)project),
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
            DbErrorStatusCodes.Ok => Ok("Project updated"),
            _ => StatusCode(500),
        };
    }

    [HttpDelete("DeleteProjectByAuthorIdAndProjectId/{authorId}/{projectId}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(401)]
    [ProducesResponseType(500)]
    public IActionResult DeleteProject(string authorId, int projectId)
    {
        var status = db.DeleteProject(authorId, projectId);
        return status switch
        {
            DbErrorStatusCodes.ProjectNotFound => NotFound("Project not found"),
            DbErrorStatusCodes.UserNotAuthorized => Unauthorized("User not authorized"),
            DbErrorStatusCodes.Ok => Ok("Project deleted"),
            _ => StatusCode(500),
        };
    }
}