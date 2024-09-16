using System.Net;
using FluentAssertions;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Backend.Tests.UnitTests;

public class ControllerShould(CustomWebAppFactory factory) : IClassFixture<CustomWebAppFactory>
{
    private readonly HttpClient _client = factory.CreateClient();


    [Fact]
    public async Task GetAllProjects_Should_Return_OKAsync()
    {
        var response = await _client.GetAsync("api/Projects");
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }
}