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

        modelBuilder.Entity<Tag>()
            .HasDiscriminator(t => t.TagType)
            .HasValue<Tag>(TagType.Skill)
            .HasValue<Tag>(TagType.Interest);
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
}