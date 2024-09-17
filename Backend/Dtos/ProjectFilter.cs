using Backend.Models;

namespace Backend.Dtos;

public record ProjectFilter(List<string>? SkillTags, List<string>? InterestTags);