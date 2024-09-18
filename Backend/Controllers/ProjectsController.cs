using Backend.Database;
using Backend.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController(DatabaseContext db) : ControllerBase
{

    [HttpGet]
    public List<ProjectResponse> GetProjects([FromQuery(Name = "interests")] string[]? interests, [FromQuery(Name = "skills")] string[]? skills)
    {
        if (skills?.Length == 0 && interests?.Length == 0)
        {
            return db.GetAllProjects();
        }

        return db.GetProjectsByFilter(skills!, interests!);
    }

    [HttpGet("Recommended/{id}")]
    public List<ProjectResponse> GetRecommendedProjectsByUserId(string id)
    {
     return db.GetRecommendedProjectsByUserId(id);
    }

    [HttpPost("Populate")]
    public IActionResult PopulateProjects()
    {
        return Ok(db.PopulateProjects());
    }

    [HttpPost]
    public IActionResult CreateProject(ProjectRequest projectRequest)
    {
        var result = db.CreateProject(projectRequest);
        if (result.Item1 == DatabaseContext.Statuses.Ok)
        {
            db.SaveChanges();
            return CreatedAtAction(nameof(GetProjectById), new { id = result.Item2!.Id }, (ProjectResponse)result.Item2);
        }
        return NotFound("User not found");
    }

    [HttpGet("{id}")]
    public ActionResult<ProjectResponse> GetProjectById(int id)
    {
        var res = db.GetProjectById(id);
        if (res == null) return NotFound("Project was not found");
        return (ProjectResponse)res;
    }

    [HttpGet("ProjectsByUserId/id")]
    public ActionResult<List<ProjectOverviewResponse>> GetProjectsByUserId(string id)
    {
        var projects = db.GetProjectsByUserId(id);
        if (projects.Item1 != DatabaseContext.Statuses.Ok) return NotFound("User not found");
        return projects.Item2!.Select(p => (ProjectOverviewResponse)p).ToList();
    }

    [HttpGet("RecommendedUsers/{id}")]
    public ActionResult<List<UserResponse>> GetRecommendedUsersByProjectId(int id)
    {
        var res = db.GetRecommendedUsersByProjectId(id);
        if(res.Item1 == DatabaseContext.Statuses.ProjectNotFound) return NotFound("Project not found");
        return res.Item2!.Select(u => (UserResponse) u).ToList();
    }

}