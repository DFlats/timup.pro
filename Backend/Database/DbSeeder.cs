using Backend.Models;
using Bogus;

namespace Backend.Database;

public class DbSeeder()
{
    public static (List<Project>, User) GenerateProjects(int count)
    {
        var authorId = Guid.NewGuid().ToString();
        var userFaker = new Faker<User>()
            .RuleFor(u => u.ClerkId, f => authorId)
            .RuleFor(u => u.Name, f => f.Name.FirstName())
            .RuleFor(u => u.Email, f => f.Internet.Email());

        var descriptionFaker = new Faker<Description>()
            .RuleFor(d => d.Text, f => f.Lorem.Paragraph());

        var fakedUser = userFaker.Generate();

        var projectFaker = new Faker<Project>()
            .RuleFor(p => p.Id, f => f.Random.Number(1, 10000))
            .RuleFor(p => p.Title, f => f.Lorem.Sentance())
            .RuleFor(p => p.Author, f => fakedUser)
            .RuleFor(p => p.AuthorId, (f, p) => authorId)
            // .RuleFor(p => p.Collaborators, f => userFaker.Generate(3))
            .RuleFor(p => p.Description, f => descriptionFaker.Generate())
            .RuleFor(p => p.Progress, f => new Progress());

        return (projectFaker.Generate(count).ToList(), fakedUser);
    }
}