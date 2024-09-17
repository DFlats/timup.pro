using Backend.Database;
using Backend.Dtos;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController(DatabaseContext db) : ControllerBase
{
    [HttpGet]
    public ActionResult<List<ProjectResponse>> GetAllProjects()
    {
        return Ok(db.GetAllProjects());
    }

    [HttpPost]
    public IActionResult PopulateProjects()
    {
        return Ok(db.PopulateProjects());
    }
}