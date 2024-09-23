using Backend.Database;
using FluentAssertions;

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
    public void Seeded_Should_Have_Tags()
    {
        var projects = DbSeeder.GenerateProjects(1);

        Assert.NotEmpty(projects.Item1[0].Description.Tags);
    }

    [Fact]
    public void Seeded_Should_Have_1_SkillTag()
    {
        var projects = DbSeeder.GenerateProjects(1);

        projects.Item1[0].Description.Tags.Where(t => t.IsSkill == true).Count().Should().Be(1);
    }

    [Fact]
    public void Seeded_Should_Have_1_InterestTag()
    {
        var projects = DbSeeder.GenerateProjects(1);

        projects.Item1[0].Description.Tags.Where(t => t.IsSkill == false).Count().Should().Be(1);
    }

    [Fact]
    public void Seeded_Should_Have_Both_InterestAndSkillTag()
    {
        var projects = DbSeeder.GenerateProjects(3);

        projects.Item1[0].Description.Tags.Where(t => t.IsSkill == true).Count().Should().Be(1);
        projects.Item1[0].Description.Tags.Where(t => t.IsSkill == false).Count().Should().Be(1);
    }
}