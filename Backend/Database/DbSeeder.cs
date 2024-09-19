using Backend.Models;
using Bogus;

namespace Backend.Database;

public class DbSeeder()
{
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

            int skillsAmount = random.Next(6);
            int interestsAmount = random.Next(6);

            List<Tag> fakedTags = [];

            List<string> skills = ["Data", "Art", "C#", "Tim", "JS", "Java"];
            for (int j = 0; j < skillsAmount; j++)
            {
                int index = random.Next(skills.Count);
                var tagFaker = new Faker<Tag>()
                    .RuleFor(t => t.TagValue, v => skills[index])
                    .RuleFor(t => t.IsSkill, v => true);

                fakedTags.Add(tagFaker.Generate());
                skills.RemoveAt(index);
            }

            List<string> interests = ["Data", "Art", "C#", "Tim", "JS", "Java"];
            for (int j = 0; j < interestsAmount; j++)
            {
                int index = random.Next(interests.Count);
                var tagFake2r = new Faker<Tag>()
                    .RuleFor(t => t.TagValue, v => interests[index])
                    .RuleFor(t => t.IsSkill, v => false);

                fakedTags.Add(tagFake2r.Generate());
                interests.RemoveAt(index);
            }

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