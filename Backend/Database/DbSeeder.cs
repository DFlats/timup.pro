using Backend.Models;
using Bogus;
using Bogus.Generators;

namespace Backend.Database;

public class DbSeeder()
{
    static readonly string[] tags = ["Data", "Art", "C#", "Tim", "JS", "Java"];
    public static (List<Project>, List<User>, List<Tag>) GenerateProjects(int count)
    {

        List<Project> _projects = [];
        List<User> _users = [];
        List<Tag> _tags = [];

        for (int i = 0; i < count; i++)
        {
            var authorId = Guid.NewGuid().ToString();
            var userFaker = new Faker<User>()
                .RuleFor(u => u.ClerkId, f => authorId)
                .RuleFor(u => u.Name, f => f.Name.FirstName())
                .RuleFor(u => u.Email, f => f.Internet.Email());

            Random random = new();

            int index1 = random.Next(tags.Length);
            int index2 = random.Next(tags.Length);

            var tagFaker = new Faker<Tag>()
                .RuleFor(t => t.TagValue, v => tags[index1])
                .RuleFor(t => t.IsSkill, v => true);

            var tagFake2r = new Faker<Tag>()
                .RuleFor(t => t.TagValue, v => tags[index2])
                .RuleFor(t => t.IsSkill, v => false);

            List<Tag> fakedTags = [tagFaker.Generate(), tagFake2r.Generate()];

            var descriptionFaker = new Faker<Description>()
                .RuleFor(d => d.Text, f => f.Lorem.Paragraph())
                .RuleFor(d => d.Tags, f => fakedTags);

            var fakedUser = userFaker.Generate();

            var projectFaker = new Faker<Project>()
                .RuleFor(p => p.Title, f => f.Lorem.Sentance())
                .RuleFor(p => p.Author, f => fakedUser)
                .RuleFor(p => p.AuthorId, (f, p) => authorId)
                // .RuleFor(p => p.Collaborators, f => userFaker.Generate(3))
                .RuleFor(p => p.Description, f => descriptionFaker.Generate())
                .RuleFor(p => p.Progress, f => new Progress());

            _projects.Add(projectFaker.Generate());
            _users.Add(fakedUser);
            _tags.AddRange(fakedTags);
        }

        return (_projects, _users, _tags);
    }
}