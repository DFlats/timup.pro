namespace Backend.Database;

public enum DbErrorStatusCodes
{
    UserNotFound,
    ProjectNotFound,
    TagAlreadyExists,
    TagNotFound,
    Ok,
    UserAlreadyExists,
    UserNotAuthorized,
    NoContent,
    UserAlreadyInProject,
    UserIsAlreadyOwner,
    UserNotFoundInProject,
}