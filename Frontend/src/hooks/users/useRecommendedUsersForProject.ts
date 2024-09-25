import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../../api";
import { User } from "../../types";

export function useRecommendedUsersForProject(projectId: number) {
    const queryKey = ['projects', 'recommendedForProject', projectId];

    const query = useQuery({
        queryKey,
        queryFn: async () => {
            const project = await endpoints.projects.getProject(projectId);
            let users = (await endpoints.users.getRecommendedUsersByProjectId(projectId!)).users;

            users = users.map(user => ({
                ...user,
                tags: {
                    'skill': user.tags['skill']
                        .filter(tag => project.tags['skill']
                            .map(projectTag => projectTag.title).includes(tag.title)),
                    'interest': user.tags['interest']
                        .filter(tag => project.tags['interest']
                            .map(projectTag => projectTag.title).includes(tag.title)),
                }
            } as User));

            return users;
        }
    });

    return {
        recommendedUsersForProject: query.data
    }
}