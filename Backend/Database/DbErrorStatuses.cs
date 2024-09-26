namespace Backend.Database;

public enum DbErrorStatusCodes
{
    FatalError,
    Ok,
    UserNotFound,
    ProjectNotFound,
    TagAlreadyExists,
    TagNotFound,
    UserAlreadyExists,
    UserNotAuthorized,
    UserAlreadyInProject,
    UserIsAlreadyOwner,
    UserNotFoundInProject,
    UserAlreadyInvited,
    NoInviteFound,
    NoRecommendedProjects,
}