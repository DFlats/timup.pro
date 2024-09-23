namespace Backend.Database;

public partial class DatabaseContext
{
    internal bool PopulateDatabase(int count = 1000)
    {
        try
        {
            var (seededProjects, seededUsers, seededTags) = GenerateData(count);
            Console.WriteLine("hello");

            Users.AddRange(seededUsers);
            Projects.AddRange(seededProjects);
            Tags.AddRange(seededTags);

            SaveChanges();

            SeedCollaborators();
            
            return true;
        }
        catch
        {
            return false;
        }
    }
}



