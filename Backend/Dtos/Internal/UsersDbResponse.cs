using Backend.Database;
using Backend.Models;

namespace Backend.Dtos.Internal;

public record UsersDbResponse
{
    public DbErrorStatusCodes DbErrorStatusCode { get; init; }
    public List<User> Users { get; init; } = [];
    public bool HasNext { get; init; } = false;

    public UsersDbResponse(DbErrorStatusCodes errorStatusCode, List<User>? users, bool? hasNext)
    {
        DbErrorStatusCode = errorStatusCode;
        Users = users ?? [];
        HasNext = hasNext ?? false;
    }
}
