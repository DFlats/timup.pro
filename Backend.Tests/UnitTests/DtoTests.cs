using Backend.Database;
using Backend.Dtos;
using Backend.Models;

namespace Backend.Tests.UnitTests;

public class DtoTests
{
    [Fact]
    public void ProjectResponse_ShouldMap_ProjectId()
    {
        var projectResponse = (ProjectResponse)TemplateProject;

        Assert.Equal(TemplateProject.Id, projectResponse.Id);
    }

    [Fact]
    public void ProjectResponse_ShouldMap_Title()
    {
        var projectResponse = (ProjectResponse)TemplateProject;

        Assert.Equal(TemplateProject.Title, projectResponse.Title);
    }

    [Fact]
    public void ProjectResponse_ShouldMap_AuthorName()
    {
        var projectResponse = (ProjectResponse)TemplateProject;

        Assert.Equal(TemplateProject.Author.Name, projectResponse.AuthorName);
    }

    [Fact]
    public void ProjectResponse_ShouldMap_AuthorId()
    {
        var projectResponse = (ProjectResponse)TemplateProject;

        Assert.Equal(TemplateProject.Author.ClerkId, projectResponse.AuthorId);
    }

    [Fact]
    public void ProjectResponse_ShouldMap_CollaboratorsCount()
    {
        var projectResponse = (ProjectResponse)TemplateProject;

        Assert.Equal(TemplateProject.Collaborators.Count, projectResponse.Collaborators.Length);
    }

    [Fact]
    public void ProjectResponse_ShouldMap_Collaborator1()
    {
        var projectResponse = (ProjectResponse)TemplateProject;

        Assert.Equal(TemplateProject.Collaborators[0].User.ClerkId, projectResponse.Collaborators[0].ClerkId);
        Assert.Equal(TemplateProject.Collaborators[0].User.Name, projectResponse.Collaborators[0].Name);
    }

    [Fact]
    public void ProjectResponse_ShouldMap_Collaborator2()
    {
        var projectResponse = (ProjectResponse)TemplateProject;

        Assert.Equal(TemplateProject.Collaborators[1].User.ClerkId, projectResponse.Collaborators[1].ClerkId);
        Assert.Equal(TemplateProject.Collaborators[1].User.Name, projectResponse.Collaborators[1].Name);
    }

    [Fact]
    public void ProjectResponse_ShouldMap_Description()
    {
        var projectResponse = (ProjectResponse)TemplateProject;

        Assert.Equal(TemplateProject.Description.Text, projectResponse.Description);
    }

    [Fact]
    public void ProjectResponse_ShouldMap_SkillTagsCount()
    {
        var projectResponse = (ProjectResponse)TemplateProject;

        Assert.Equal(TemplateProject.Description.Tags.Count(t => t.IsSkill), projectResponse.SkillTags.Length);
    }

    [Fact]
    public void ProjectResponse_ShouldMap_InterestTagsCount()
    {
        var projectResponse = (ProjectResponse)TemplateProject;

        Assert.Equal(TemplateProject.Description.Tags.Count(t => !t.IsSkill), projectResponse.InterestTags.Length);
    }

    [Fact]
    public void ProjectResponse_ShouldMap_SkillTags()
    {
        var projectResponse = (ProjectResponse)TemplateProject;

        Assert.Equal(TemplateProject.Description.Tags[0].TagValue, projectResponse.SkillTags[0]);
        Assert.Equal(TemplateProject.Description.Tags[1].TagValue, projectResponse.SkillTags[1]);
    }

    [Fact]
    public void ProjectResponse_ShouldMap_InterestTags()
    {
        var projectResponse = (ProjectResponse)TemplateProject;

        Assert.Equal(TemplateProject.Description.Tags[2].TagValue, projectResponse.InterestTags[0]);
        Assert.Equal(TemplateProject.Description.Tags[3].TagValue, projectResponse.InterestTags[1]);
    }

    [Fact]
    public void ProjectResponse_ShouldMap_IsCompleted()
    {
        var projectResponse = (ProjectResponse)TemplateProject;

        Assert.Equal(TemplateProject.Progress.IsCompleted, projectResponse.IsCompleted);
    }

    [Fact]
    public void ProjectResponse_ShouldMap_InvitedUsersCount()
    {
        var projectResponse = (ProjectResponse)TemplateProject;

        Assert.Equal(TemplateProject.ProjectInvites.Count, projectResponse.PendingInvites.Length + projectResponse.UserJoinRequests.Length);
    }

    static readonly Project TemplateProject = new()
    {
        Id = 1,
        Title = "Test Project",
        Author = new User
        {
            ClerkId = "123",
            Name = "Test User"
        },
        Collaborators =
        [
            new() {
                User = new User
                {
                    ClerkId = "456",
                    Name = "Collaborator 1"
                }
            },
            new() {
                User = new User
                {
                    ClerkId = "789",
                    Name = "Collaborator 2"
                }
            }
        ],
        Description = new Description
        {
            Text = "Test Description",
            Tags =
            [
                new() {
                    TagValue = "Skill 1",
                    IsSkill = true
                },
                new() {
                    TagValue = "Skill 2",
                    IsSkill = true
                },
                new() {
                    TagValue = "Interest 1",
                    IsSkill = false
                },
                new() {
                    TagValue = "Interest 2",
                    IsSkill = false
                }
            ]
        },
        Progress = new Progress
        {
            IsCompleted = true
        },
        ProjectInvites =
        [
            new() {
                User = new User
                {
                    ClerkId = "101112",
                    Name = "Invited User 1"
                },
                ProjectAccepted = true
            },
            new() {
                User = new User
                {
                    ClerkId = "131415",
                    Name = "Invited User 2"
                },
            UserAccepted = true

            }
        ]
    };
}