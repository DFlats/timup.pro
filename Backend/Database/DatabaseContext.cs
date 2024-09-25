using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Database;
public partial class DatabaseContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<Progress> Progresses { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<Description> Descriptions { get; set; }
    public DbSet<ProjectInvite> ProjectInvites { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Project>()
            .HasOne(p => p.Author)
            .WithMany(u => u.ProjectsAuthored)
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

    internal int ClearDatabase()
    {
        Users.RemoveRange(Users);
        Projects.RemoveRange(Projects);
        ProjectInvites.RemoveRange(ProjectInvites);
        Progresses.RemoveRange(Progresses);
        Tags.RemoveRange(Tags);
        Descriptions.RemoveRange(Descriptions);
        ProjectInvites.RemoveRange(ProjectInvites);
        return SaveChanges();
    }

    internal bool ClearDatabase()
    {
        try
        {
            Users.RemoveRange(Users);
            Projects.RemoveRange(Projects);
            Progresses.RemoveRange(Progresses);
            Tags.RemoveRange(Tags);
            Descriptions.RemoveRange(Descriptions);
            ProjectInvites.RemoveRange(ProjectInvites);
            SaveChanges();
            
            return true;
        }
        catch
        {
            return false;
        }
    }
}