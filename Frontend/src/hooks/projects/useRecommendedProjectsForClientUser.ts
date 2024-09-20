import { useQuery } from "@tanstack/react-query";
import { ProjectResponse, endpoints } from "../../api";
import { useClientUser } from "../users";

export function useRecommendedProjectsForClientUser() {
    const { clientUser } = useClientUser()
    const queryKey = ['projects', 'recommendedForClientUser'];

    const recommendedProjectsForClientUserQuery = useQuery({
        queryKey,
        queryFn: async (): Promise<ProjectResponse[]> => {
            if (!clientUser) return [];

            return await endpoints.projects.getProjects(clientUser.skillTags, clientUser.interestTags);
        }
    });

    return {
        recommendedProjectsForClientUser: recommendedProjectsForClientUserQuery.data
    }
}