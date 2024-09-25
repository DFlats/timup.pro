using Backend.Database;
using Backend.Models;

namespace Backend.Dtos.Internal;

public record UserDbResponse
{
    public User? User { get; init; }
    public DbErrorStatusCodes DbErrorStatusCode { get; init; }

    public UserDbResponse(DbErrorStatusCodes dbErrorStatusCode, User? user)
    {
        DbErrorStatusCode = dbErrorStatusCode;
        User = user;
    }
}