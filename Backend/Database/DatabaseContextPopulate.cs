using Backend.Models;
using Bogus;
using Microsoft.EntityFrameworkCore;

namespace Backend.Database;

public partial class DatabaseContext
{
    public static List<User> _users = [];
    public static List<Project> _projects = [];
    public static List<Tag> _tags = [];

    internal bool PopulateDatabase(int count = 100)
    {

        var (seededProjects, seededUsers, seededTags) = GenerateData(count);

        Users.AddRange(seededUsers);
        Projects.AddRange(seededProjects);
        Tags.AddRange(seededTags);
        SaveChanges();

        SeedCollaborators();

        return true;
    }

    internal (List<Project>, List<User>, List<Tag>) GenerateData(int count)
    {
        SeedUsers(count * 2);
        SeedProjects(count);

        return (_projects, _users, _tags);
    }

    internal static void SeedUsers(int count)
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

    internal static void SeedProjects(int count)
    {
        for (int i = 0; i < count; i++)
        {
            Random random = new();

            var user = _users[random.Next(_users.Count)];

            var fakedTags = CreateFakeTags(random);

            var fakedProject = CreateFakeProject(user, user.ClerkId, fakedTags);

            user.ProjectsAuthored.Add(fakedProject);

            _projects.Add(fakedProject);
            _tags.AddRange(fakedTags);
        }
    }

    internal void SeedCollaborators()
    {
        var projects = Projects.Include(p => p.Collaborators).ToList();
        var users = Users.Include(u => u.ProjectsAuthored).ToList();

        foreach (var project in projects)
        {
            Random random = new();

            for (int i = 0; i < random.NextInt64(1, 6); i++)
            {
                var user = users.ElementAt(random.Next(users.Count - 1));
                var collaborator = new Collaborator
                {
                    UserId = user.ClerkId,
                    User = user
                };
                if (project.AuthorId == user.ClerkId) continue;
                if (project.Collaborators.Count != 0 && project.Collaborators.Any(u => u.UserId == user.ClerkId)) continue;
                project.Collaborators.Add(collaborator);
                user.ProjectsCollaborated.Add(new ProjectCollaborated { Project = project, ProjectId = project.Id });
                SaveChanges();
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

        List<string> skills = ["JavaScript", "Painting", "Dancing", "Rhetorics", "C#", "Juggling", "Visual Design", "Guitar", "Football", "Writing"];
        for (int j = 0; j < skillsAmount; j++)
        {
            int index = random.Next(skills.Count);
            var tagFaker = new Faker<Tag>()
                .RuleFor(t => t.TagValue, v => skills[index])
                .RuleFor(t => t.IsSkill, v => true);

            fakedTags.Add(tagFaker.Generate());
            skills.RemoveAt(index);
        }

        List<string> interests = ["Game Development", "Movies", "Literature", "Sports", "Poetry", "Gaming", "Exploration", "Science", "Cooking"];
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
        var (projectTitles, projectDescriptions) = DataSeeder.GetProjectDataLists();

        Random random = new();
        int projectTitlesIndex = random.Next(projectTitles.Count - 1);
        int projectDescriptionsIndex = random.Next(projectDescriptions.Count - 1);

        var descriptionFaker = new Faker<Description>()
            .RuleFor(d => d.Text, f => projectDescriptions[projectDescriptionsIndex])
            .RuleFor(d => d.Tags, f => fakedTags);

        var projectFaker = new Faker<Project>()
            .RuleFor(p => p.Title, f => projectTitles[projectTitlesIndex])
            .RuleFor(p => p.Author, f => fakedUser)
            .RuleFor(p => p.AuthorId, (f, p) => authorId)
            .RuleFor(p => p.Description, f => descriptionFaker.Generate())
            .RuleFor(p => p.Progress, f => new Progress());

        projectTitles.RemoveAt(projectTitlesIndex);
        projectDescriptions.RemoveAt(projectDescriptionsIndex);

        return projectFaker.Generate();
    }
}



