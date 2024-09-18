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

    [HttpPost]
    public IActionResult PopulateProjects()
    {
        return Ok(db.PopulateProjects());
    }
}