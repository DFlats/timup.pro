using Backend.Database;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController(DatabaseContext db) : ControllerBase
{
    [HttpGet]
    public ActionResult<List<Project>> GetAllProjects()
    {
        return Ok(db.GetAllProjects());
    }
}