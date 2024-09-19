using Backend.Database;
using Backend.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController(DatabaseContext db) : ControllerBase
{

    [HttpGet]
    public List<ProjectResponse> GetProjects
    (
        [FromQuery(Name = "interests")] string[]? interests,
        [FromQuery(Name = "skills")] string[]? skills
    )
    {
        if (skills?.Length == 0 && interests?.Length == 0)
        {
            return db.GetAllProjects();
        }

        return db.GetProjectsByFilter(skills, interests);
    }

    [HttpGet("GetRecommendedProjectsByUserId/{id}")]
    public ActionResult<List<ProjectResponse>> GetRecommendedProjectsByUserId(string id)
    {
        (var status, var projects) = db.GetRecommendedProjectsByUserId(id);

        return status switch
        {
            DbErrorStatusCodes.UserNotFound => NotFound("User not found"),
            DbErrorStatusCodes.Ok => projects!,
            _ => StatusCode(500),
        };
    }

    [HttpPost("Populate")]
    public IActionResult PopulateProjects()
    {
        return Ok(db.PopulateProjects());
    }

    [HttpPost]
    public IActionResult CreateProject(ProjectRequest projectRequest)
    {
        (var status, var project) = db.CreateProject(projectRequest);

        return status switch {
            DbErrorStatusCodes.UserNotFound => NotFound("Could not find a user for given project"),
            DbErrorStatusCodes.Ok => CreatedAtAction(nameof(GetProjectByProjectId), new { id = project!.Id }, (ProjectResponse)project),
            _ => StatusCode(500),
        };

    }

    [HttpGet("GetProjectByProjectId/{id}")]
    public ActionResult<ProjectResponse> GetProjectByProjectId(int id)
    {
        var res = db.GetProjectById(id);
        if (res == null) return NotFound("Project was not found");
        return (ProjectResponse)res;
    }

    [HttpGet("GetProjectsByUserId/{id}")]
    public ActionResult<List<ProjectOverviewResponse>> GetProjectsByUserId(string id)
    {
        (var status, var projects) = db.GetProjectsByUserId(id);

        return status switch
        {
            DbErrorStatusCodes.UserNotFound => NotFound("User not found"),
            DbErrorStatusCodes.Ok => projects!.Select(p => (ProjectOverviewResponse)p).ToList(),
            _ => StatusCode(500),
        };

    }

}