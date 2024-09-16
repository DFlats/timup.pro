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
}