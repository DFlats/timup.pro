export type Project = {
    title: string,
    description: string,
    skillTags: string[],
    interestTags: string[],
    users: string[]
};

export default function useProjects() {
    const projects: Project[] = [
        {
            title: "Book Club",
            description: "We meet and discuss heavy literature",
            skillTags: ["Reading", "Debate"],
            interestTags: ["Literature", "Socializing"],
            users: []
        },
        {
            title: "World Takeover",
            description: "A political party aiming for world domination",
            skillTags: ["Debate", "Oratory"],
            interestTags: ["Politics"],
            users: []
        },
    ]

    return {
        projects
    }
}