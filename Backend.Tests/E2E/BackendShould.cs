namespace Backend.Tests.E2E;

public class BackendShould(CustomWebAppFactory factory) : IClassFixture<CustomWebAppFactory>
{
    private readonly HttpClient httpClient = factory.CreateClient();

    [Fact]
    public async Task GetProjects_ReturnsSuccess()
    {
        var response = await httpClient.GetAsync("/api/Projects/GetProjects");

        response.EnsureSuccessStatusCode();
        var responseString = await response.Content.ReadAsStringAsync();
        Assert.NotNull(responseString);
    }

    [Fact]
    public async Task GetUsers_ReturnsSuccess()
    {
        var response = await httpClient.GetAsync("/api/Users/GetUsers");

        response.EnsureSuccessStatusCode();
        var responseString = await response.Content.ReadAsStringAsync();
        Assert.NotNull(responseString);
    }
    
}
