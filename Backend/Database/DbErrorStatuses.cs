namespace Backend.Database;

public enum DbErrorStatusCodes
{
    FatalError,
    Ok,
    NoContent,
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
}