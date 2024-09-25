using Microsoft.EntityFrameworkCore;
using Backend.Database;

const string applicationTitle = "TeamUp";
const string version = "v1.0.11";

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

var allowedOrigins = new[] {
    "http://timup.pro:5173",
    "http://localhost:5173"
};

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins",
        builder => builder
            .WithOrigins(allowedOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod());
});

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

// Apply the CORS policy
app.UseCors("AllowSpecificOrigins");

app.UseHttpsRedirection();

// app.UseAuthentication();
// app.UseAuthorization();

app.MapControllers();

app.Run();

public partial class Program { }