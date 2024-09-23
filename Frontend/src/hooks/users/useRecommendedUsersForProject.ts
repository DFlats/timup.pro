import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../../api";

export function useRecommendedUsersForProject(projectId: number) {
    const queryKey = ['projects', 'recommendedForProject', projectId];

    const query = useQuery({
        queryKey,
        queryFn: async () => {
            return await endpoints.users.getRecommendedUsersByProjectId(projectId!);
        }
    });

    return {
        recommendedUsersForProject: query.data
    }
}