namespace Backend.Tests.E2E;
[Collection("SequentialTests")]
public class BackendShould(CustomWebAppFactory factory) : IClassFixture<CustomWebAppFactory>
{
    private readonly HttpClient httpClient = factory.CreateClient();

    private async Task PopulateDatabase()
    {
        await httpClient.PostAsync("/api/Populates/PopulateDatabase", null);
    }

    private async Task ClearDatabase()
    {
        await httpClient.PostAsync("/api/Populates/ClearDatabase", null);
    }

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

    [Fact]
    public async Task PopulateDb_ReturnSuccess()
    {
        var response = await httpClient.PostAsync("/api/Populates/PopulateDatabase", null);

        response.EnsureSuccessStatusCode();
        var responseString = await response.Content.ReadAsStringAsync();
        Assert.Equal("true", responseString);
    }

    [Fact]
    public async Task ClearDb_ReturnSuccess()
    {
        var response = await httpClient.PostAsync("/api/Populates/ClearDatabase", null);

        response.EnsureSuccessStatusCode();
        var responseString = await response.Content.ReadAsStringAsync();
        Assert.Equal("true", responseString);
    }
}