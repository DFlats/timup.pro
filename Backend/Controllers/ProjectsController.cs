using Backend.Database;
using Backend.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController(DatabaseContext db) : ControllerBase
{

    [HttpGet()]
    public List<ProjectResponse> GetProjectsByFilter([FromQuery(Name = "interests")] string[]? interests, [FromQuery(Name = "skills")] string[]? skills)
    {
        if (skills.Length == 0 && interests.Length == 0) return db.GetAllProjects();
        return db.GetProjectsByFilter(skills, interests);
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
            return CreatedAtAction(nameof(GetProjectById), new {id = result.Item2!.Id}, (ProjectResponse)result.Item2 );
        }
        return NotFound("User not found");
    }

    [HttpGet("{id}")]
    public ActionResult<ProjectResponse> GetProjectById(int id){
        var res = db.GetProjectById(id);
        if(res == null) return NotFound("Project was not found");
        return (ProjectResponse) res;
    }


}