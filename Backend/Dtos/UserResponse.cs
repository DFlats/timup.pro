using System.Runtime.CompilerServices;
using Backend.Models;

namespace Backend.Dtos;
public record UserResponse(string Id, string Name, string Email, int[] ProjectIds, string[] InterestTags, string[] SkillTags)
{

    public static implicit operator UserResponse(User user)
    {
        string[] interestTags = user.Tags.Where(t => t.IsSkill == false).Select(t => t.TagValue).ToArray();
        string[] skillTags = user.Tags.Where(t => t.IsSkill == true).Select(t => t.TagValue).ToArray();
        int[] projectIds = user.Projects.Select(p => p.Id).ToArray();

        return new UserResponse(
            user.ClerkId,
            user.Name,
            user.Email,
            projectIds,
            interestTags,
            skillTags
        );

    }
}