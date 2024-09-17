using Backend.Database;

namespace Backend.Tests.UnitTests;

public class SeederTests
{
    [Fact]
    public void Seeder_Seeds()
    {
        var projects = DbSeeder.GenerateProjects(10);

        Assert.Equal(10, projects.Item1.Count);
    }

    [Fact]
    public void Seeded_Should_Have_InterestTags()
    {
        var projects = DbSeeder.GenerateProjects(1);

        Assert.NotEmpty(projects.Item1[0].Description.InterestTags);
    }

        [Fact]
    public void Seeded_Should_Have_SkillTags()
    {
        var projects = DbSeeder.GenerateProjects(1);

        Assert.NotEmpty(projects.Item1[0].Description.SkillTags);
    }
}