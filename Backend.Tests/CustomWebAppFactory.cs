using Backend.Database;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Backend.Tests;

public class CustomWebAppFactory : WebApplicationFactory<Program>
{
    private readonly string _remoteDbConnectionString = "Server=rorycraft.com,1433;Database=TeamUpDbTEST3;User Id=sa;Password=Password_2_Change_4_Real_Cases_&;TrustServerCertificate=true";
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseSetting("ConnectionStrings:DefaultConnection", _remoteDbConnectionString);

        builder.ConfigureServices(services =>
        {
            services.RemoveAll<DbContextOptions<DatabaseContext>>();
            services.RemoveAll<DatabaseContext>();
            services.AddDbContext<DatabaseContext>(options =>
            {
                options.UseSqlServer(_remoteDbConnectionString);
            });
        });
    }
}