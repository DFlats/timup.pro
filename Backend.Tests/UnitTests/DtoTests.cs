using Backend.Database;
using Backend.Dtos;

namespace Backend.Tests.UnitTests;

public class DtoTests()
{
    [Fact]
    public void ProjectResponse_ConvertsFrom_Project()
    {
        var project = DbSeeder.GenerateProjects(1).Item1[0];

        var projectResponse = (ProjectResponse)project;

        Assert.Equal(project.Id, projectResponse.Id);
    }

    [Fact]
    public void ProjectResponse_ConvertsTags_FromProject()
    {
        var project = DbSeeder.GenerateProjects(1).Item1[0];

        var projectResponse = (ProjectResponse)project;

        Assert.Equal(project.Description.SkillTags.Count, projectResponse.SkillTags.Length);
    }
}