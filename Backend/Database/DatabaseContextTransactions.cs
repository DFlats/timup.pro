using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Database;

public partial class DatabaseContext
{
    private bool RemoveCollaboratorFromProject(User user, Project project)
    {
        if (project.AuthorId == user.ClerkId) return false;
        if (!project.Collaborators.Any(u => u.UserId == user.ClerkId)) return false;
        var collaborator = project.Collaborators.First(c => c.UserId == user.ClerkId);
        project.Collaborators.Remove(collaborator);
        var collaborationRef = user.ProjectsCollaborated.FirstOrDefault(c => c.ProjectId == project.Id);
        if (collaborationRef == null) return false;
        user.ProjectsCollaborated.Remove(collaborationRef);
        SaveChanges();
        return true;
    }

    internal DbErrorStatusCodes HandleJoinProjectRequest(string userId, int projectId)
    {
        var user = GetUserById(userId);
        if (user is null) return DbErrorStatusCodes.UserNotFound;

        var project = GetProjectById(projectId);
        if (project is null) return DbErrorStatusCodes.ProjectNotFound;

        if (project.AuthorId == userId) return DbErrorStatusCodes.UserAlreadyInProject;

        if (project.Collaborators.Any(u => u.UserId == userId)) return DbErrorStatusCodes.UserAlreadyInProject;

        if (project.ProjectInvites.Any(p => p.User.ClerkId == userId)) return DbErrorStatusCodes.UserAlreadyInvited;

        AddProjectJoinRequest(user, project);

        return DbErrorStatusCodes.Ok;
    }

    private void AddProjectJoinRequest(User user, Project project)
    {
        var projectInvite = new ProjectInvite
        {
            User = user,
            Project = project,
            UserAccepted = true
        };
        ProjectInvites.Add(projectInvite);
        SaveChanges();
    }

    internal DbErrorStatusCodes HandleAcceptProjectInviteRequest(string userId, int projectId)
    {
        var user = GetUserById(userId);
        if (user is null) return DbErrorStatusCodes.UserNotFound;

        var project = GetProjectById(projectId);
        if (project is null) return DbErrorStatusCodes.ProjectNotFound;

        if (project.AuthorId == userId) return DbErrorStatusCodes.UserIsAlreadyOwner;

        if (project.Collaborators.Any(u => u.UserId == userId)) return DbErrorStatusCodes.UserAlreadyInProject;

        if (!project.ProjectInvites.Any(p => p.User.ClerkId == userId)) return DbErrorStatusCodes.UserNotFoundInProject;

        AddUserToProject(user, project);
        RemoveProjectInvite(user, project);

        return DbErrorStatusCodes.Ok;
    }

    private void RemoveProjectInvite(User user, Project project)
    {
        var projectInvite = project.ProjectInvites.FirstOrDefault(p => p.User.ClerkId == user.ClerkId);
        if (projectInvite is not null)
        {
            ProjectInvites.Remove(projectInvite);
            SaveChanges();
        }
    }

    internal object HandleDeclineProjectInviteRequest(string userId, int projectId)
    {
        var user = GetUserById(userId);
        if (user is null) return DbErrorStatusCodes.UserNotFound;

        var project = GetProjectById(projectId);
        if (project is null) return DbErrorStatusCodes.ProjectNotFound;

        if (!project.ProjectInvites.Any(p => p.User.ClerkId == userId)) return DbErrorStatusCodes.UserNotFoundInProject;

        RemoveProjectInvite(user, project);

        return DbErrorStatusCodes.Ok;
    }

    internal DbErrorStatusCodes HandleLeaveProjectRequest(string userId, int projectId)
    {
        var user = GetUserById(userId);
        if (user is null) return DbErrorStatusCodes.UserNotFound;

        var project = GetProjectById(projectId);
        if (project is null) return DbErrorStatusCodes.ProjectNotFound;

        if (project.AuthorId == userId) return DbErrorStatusCodes.UserIsAlreadyOwner;

        if (!project.Collaborators.Any(u => u.UserId == userId)) return DbErrorStatusCodes.UserNotFoundInProject;

        RemoveCollaboratorFromProject(user, project);

        return DbErrorStatusCodes.Ok;
    }

    internal DbErrorStatusCodes HandleKickUserRequest(string userId, int projectId)
    {
        var user = GetUserById(userId);
        if (user is null) return DbErrorStatusCodes.UserNotFound;

        var project = GetProjectById(projectId);
        if (project is null) return DbErrorStatusCodes.ProjectNotFound;

        if (project.AuthorId == userId) return DbErrorStatusCodes.UserIsAlreadyOwner;

        if (!project.Collaborators.Any(u => u.UserId == userId)) return DbErrorStatusCodes.UserNotFoundInProject;

        RemoveCollaboratorFromProject(user, project);

        return DbErrorStatusCodes.Ok;
    }

    internal DbErrorStatusCodes InviteToProject(string userId, int projectId)
    {
        var user = GetUserById(userId);
        if (user is null) return DbErrorStatusCodes.UserNotFound;

        var project = GetProjectById(projectId);
        if (project is null) return DbErrorStatusCodes.ProjectNotFound;

        if (project.AuthorId == userId) return DbErrorStatusCodes.UserIsAlreadyOwner;

        if (project.Collaborators.Any(u => u.UserId == userId)) return DbErrorStatusCodes.UserAlreadyInProject;

        if (user.ProjectInvites.Any(i => i.Project.Id == projectId)) return DbErrorStatusCodes.UserAlreadyInvited;

        UserAddInviteToProject(user, project);

        return DbErrorStatusCodes.Ok;
    }

    private void UserAddInviteToProject(User user, Project project)
    {
        var projectInvite = new ProjectInvite
        {
            User = user,
            Project = project,
            ProjectAccepted = true
        };
        user.ProjectInvites.Add(projectInvite);
        ProjectInvites.Add(projectInvite);
        SaveChanges();
    }

    internal DbErrorStatusCodes HandleInviteUserToProjectAccept(string userId, int projectId)
    {
        var user = GetUserById(userId);
        if (user is null) return DbErrorStatusCodes.UserNotFound;

        var project = GetProjectById(projectId);
        if (project is null) return DbErrorStatusCodes.ProjectNotFound;

        if (project.AuthorId == userId) return DbErrorStatusCodes.UserIsAlreadyOwner;

        if (project.Collaborators.Any(u => u.UserId == userId)) return DbErrorStatusCodes.UserAlreadyInProject;

        if (!project.ProjectInvites.Any(p => p.User.ClerkId == userId)) return DbErrorStatusCodes.NoInviteFound;

        AddUserToProject(user, project);
        UserRemoveProjectInvite(user, project);

        return DbErrorStatusCodes.Ok;
    }

    private void UserRemoveProjectInvite(User user, Project project)
    {
        var projectInvite = user.ProjectInvites.FirstOrDefault(p => p.Project.Id == project.Id);
        if (projectInvite is not null)
        {
            user.ProjectInvites.Remove(projectInvite);
            ProjectInvites.Remove(projectInvite);
            SaveChanges();
        }
    }

    internal DbErrorStatusCodes HandleInviteUserToProjectDeny(string userId, int projectId)
    {
        var user = GetUserById(userId);
        if (user is null) return DbErrorStatusCodes.UserNotFound;

        var project = GetProjectById(projectId);
        if (project is null) return DbErrorStatusCodes.ProjectNotFound;

        if (!user.ProjectInvites.Any(p => p.Project.Id == project.Id)) return DbErrorStatusCodes.NoInviteFound;

        UserRemoveProjectInvite(user, project);

        return DbErrorStatusCodes.Ok;
    }

    internal (DbErrorStatusCodes, List<ProjectInvite>?) GetUserInvites(string userId)
    {
        var user = Users
                    .Include(u => u.ProjectInvites).ThenInclude(i => i.Project)
                    .FirstOrDefault(u => u.ClerkId == userId);
        if (user == null) return (DbErrorStatusCodes.UserNotFound, null);
        return (DbErrorStatusCodes.Ok, user.ProjectInvites.Where(i => i.ProjectAccepted == true).ToList());
    }

    internal (DbErrorStatusCodes, List<ProjectInvite>?) GetProjectInvites(int projectId)
    {
        var project = Projects
                    .Include(p => p.ProjectInvites).ThenInclude(i => i.User)
                    .FirstOrDefault(p => p.Id == projectId);
        if (project == null) return (DbErrorStatusCodes.ProjectNotFound, null);
        return (DbErrorStatusCodes.Ok, project.ProjectInvites.Where(i => i.UserAccepted == true).ToList());
    }
}