using Backend.Models;
using Bogus;

namespace Backend.Database;

public partial class DatabaseContext
{
    public static List<User> _users = [];
    public static List<Project> _projects = [];
    public static List<Tag> _tags = [];

    internal (List<Project>, List<User>, List<Tag>) GenerateData(int count)
    {
        SeedUsers(count * 2);
        SeedProjects(count);
        //SeedCollaborators();

        return (_projects, _users, _tags);
    }

    private static void SeedUsers(int count)
    {
        for (int i = 0; i < count; i++)
        {
            Random random = new();

            var fakedTags = CreateFakeTags(random);

            var authorId = Guid.NewGuid().ToString();
            var fakedUser = CreateFakeUser(authorId, fakedTags);

            _users.Add(fakedUser);
        }
    }

    private static void SeedProjects(int count)
    {
        for (int i = 0; i < count; i++)
        {
            Random random = new();

            var user = _users[random.Next(_users.Count)];

            var fakedTags = CreateFakeTags(random);

            var fakedProject = CreateFakeProject(user, user.ClerkId, fakedTags);

            user.Projects.Add(fakedProject);

            _projects.Add(fakedProject);
            _tags.AddRange(fakedTags);
        }
    }

    internal void SeedCollaborators()
    {
        foreach (var project in _projects)
        {
            Random random = new();

            for (int j = 0; j < random.Next(5); j++)
            {
                var user = _users[random.Next(_users.Count)];
                AddUserToProject(user, project);
                 project.Collaborators.Add(user);
                 user.Projects.Add(project);
            }
        }
    }

    private static User CreateFakeUser(string authorId, List<Tag> fakedTags)
    {
        var userFaker = new Faker<User>()
                .RuleFor(u => u.ClerkId, f => authorId)
                .RuleFor(u => u.Name, f => f.Name.FirstName())
                .RuleFor(u => u.Email, f => f.Internet.Email())
                .RuleFor(u => u.Tags, f => fakedTags);

        return userFaker.Generate();
    }

    private static List<Tag> CreateFakeTags(Random random)
    {
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

        return fakedTags;
    }

    private static Project CreateFakeProject(User fakedUser, string authorId, List<Tag> fakedTags)
    {
        var descriptionFaker = new Faker<Description>()
                .RuleFor(d => d.Text, f => f.Lorem.Paragraph())
                .RuleFor(d => d.Tags, f => fakedTags);

        var projectFaker = new Faker<Project>()
            .RuleFor(p => p.Title, f => f.Lorem.Sentance())
            .RuleFor(p => p.Author, f => fakedUser)
            .RuleFor(p => p.AuthorId, (f, p) => authorId)
            .RuleFor(p => p.Description, f => descriptionFaker.Generate())
            .RuleFor(p => p.Progress, f => new Progress());

        return projectFaker.Generate();
    }
}