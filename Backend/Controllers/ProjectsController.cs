using Backend.Database;
using Backend.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController(DatabaseContext db) : ControllerBase
{

    [HttpGet()]
    public List<ProjectResponse> GetProjectsByFilter(ProjectFilter? filter)
    {
        if(filter is null) return db.GetAllProjects();
        return db.GetProjectsByFilter(filter);
    }

    [HttpPost]
    public IActionResult PopulateProjects()
    {
        return Ok(db.PopulateProjects());
    }
}