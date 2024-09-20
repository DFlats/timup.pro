using Microsoft.EntityFrameworkCore;
using Backend.Database;

const string applicationTitle = "TeamUp";
const string version = "v1.0.2";

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddUserSecrets<Program>();
builder.Services.AddDbContext<DatabaseContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddSignalR();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = applicationTitle;
    config.Title = applicationTitle;
    config.Version = version;
});

builder.Services.AddCors();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi(config =>
    {
        config.DocumentTitle = applicationTitle;
        config.Path = "/swagger";
        config.DocumentPath = "/swagger/{documentName}/swagger.json";
        config.DocExpansion = "list";
    });
}

app.UseCors(options =>
{
    options
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials()
        .SetIsOriginAllowed(origin => true);
});

app.UseHttpsRedirection();

// app.UseAuthentication();
// app.UseAuthorization();

app.MapControllers();

// app.Run("http://0.0.0.0:26969");
app.Run();
public partial class Program { }