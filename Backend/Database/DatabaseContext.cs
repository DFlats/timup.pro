using Backend.Dtos;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Database;
public class DatabaseContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<Progress> Progresses { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<Description> Descriptions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Project>()
            .HasOne(p => p.Author)
            .WithMany(u => u.Projects)
            .HasForeignKey(p => p.AuthorId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Description>()
            .HasMany(d => d.Tags)
            .WithOne()
            .HasForeignKey(t => t.DescriptionId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<User>()
            .HasMany(u => u.Tags)
            .WithOne()
            .HasForeignKey(t => t.UserId)
            .OnDelete(DeleteBehavior.Restrict);
    }

    internal List<ProjectResponse> GetAllProjects()
    {
        return [.. Projects.Include(p => p.Author)
                            .Include(p => p.Description)
                            .ThenInclude(p => p.Tags)
                            .Select(p => (ProjectResponse) p)];
    }

    internal bool PopulateProjects(int count = 10)
    {
        try
        {
            var (seededProjects, seededUsers, seededTags) = DbSeeder.GenerateProjects(count);

            Users.AddRange(seededUsers);
            Projects.AddRange(seededProjects);
            Tags.AddRange(seededTags);

            SaveChanges();
            return true;
        }
        catch
        {
            return false;
        }
    }

    internal List<ProjectResponse> GetProjectsByFilter(ProjectFilter filter)
    {
        var filterByInterestTags = filter.InterestTags is not null;

        var projects = Projects
            .Include(p => p.Author)
            .Include(p => p.Description)
            .ThenInclude(p => p.Tags)
            .ToList();

        List<(Project, int)> FilterProjectsByTags(List<Project> projects, List<string> tagStrings, bool isSkill)
        {
            var tags = tagStrings
                .Select(t => new Tag()
                {
                    Id = 0,
                    TagValue = t,
                    IsSkill = isSkill
                })
                .ToList();

            var projectsFilteredByTags = new List<(Project, int)>();

            foreach (var project in projects)
            {
                var projectSkillTags = project.Description.Tags.Where(tag => tag.IsSkill);

                var intersection = projectSkillTags.Intersect(tags);
                if (intersection.Count() > 0)
                {
                    projectsFilteredByTags.Add((project, intersection.Count()));
                }
            }

            return projectsFilteredByTags.ToList();
        }

        if (filter.SkillTags is not null)
        {
            projects = FilterProjectsByTags(projects, filter.SkillTags, true)
                .OrderByDescending(projectTuple => projectTuple.Item2)
                .Select(projectTuple => projectTuple.Item1)
                .ToList();
        }

        return projects
            .Select(p => (ProjectResponse)p).ToList();
    }
}