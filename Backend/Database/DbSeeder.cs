using Backend.Models;
using Bogus;
using Bogus.Generators;

namespace Backend.Database;

public class DbSeeder()
{
    static string[] tags = ["Data", "Art", "C#", "Tim", "JS", "Java"];
    public static (List<Project>, User) GenerateProjects(int count)
    {
        var authorId = Guid.NewGuid().ToString();
        var userFaker = new Faker<User>()
            .RuleFor(u => u.ClerkId, f => authorId)
            .RuleFor(u => u.Name, f => f.Name.FirstName())
            .RuleFor(u => u.Email, f => f.Internet.Email());

        Random random = new();
        int index = random.Next(tags.Length);

        var tagFaker = new Faker<Tag>()
        .RuleFor(t => t.TagValue, v => tags[index]);

        List<Tag> fakerTags = [tagFaker.Generate(), tagFaker.Generate()];
        
        var descriptionFaker = new Faker<Description>()
            .RuleFor(d => d.Text, f => f.Lorem.Paragraph())
            .RuleFor(d => d.Tags, T => fakerTags);


        var fakedUser = userFaker.Generate();

        var projectFaker = new Faker<Project>()
            .RuleFor(p => p.Title, f => f.Lorem.Sentance())
            .RuleFor(p => p.Author, f => fakedUser)
            .RuleFor(p => p.AuthorId, (f, p) => authorId)
            // .RuleFor(p => p.Collaborators, f => userFaker.Generate(3))
            .RuleFor(p => p.Description, f => descriptionFaker.Generate())
            .RuleFor(p => p.Progress, f => new Progress());

        return (projectFaker.Generate(count).ToList(), fakedUser);
    }
}