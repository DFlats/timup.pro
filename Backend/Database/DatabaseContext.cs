using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Database;
public class DatabaseContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<Progress> Progresses { get; set; }
    public DbSet<User> Tags { get; set; }
    public DbSet<User> Descriptions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Project>()
            .HasOne(p => p.Author)
            .WithMany(u => u.Projects)
            .HasForeignKey(p => p.AuthorId)
            .OnDelete(DeleteBehavior.Restrict);

    }

    internal List<Project> GetAllProjects()
    {
        return [.. Projects];
    }

    internal bool PopulateProjects(int count = 10)
    {
        try
        {
            var (seededProjects, seededUser) = DbSeeder.GenerateProjects(count);
            Users.Add(seededUser);
            Projects.AddRange(seededProjects);

            SaveChanges();
            return true;
        }
        catch
        {
            return false;
        }
    }
}

