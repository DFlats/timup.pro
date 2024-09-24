import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../../api";
import { useClientUser } from "../users";

export function useRecommendedProjectsForClientUser() {
    const { clientUser } = useClientUser()
    const queryKey = ['projects', 'recommendedForClientUser'];

    const recommendedProjectsForClientUserQuery = useQuery({
        queryKey,
        queryFn: async () => {
            if (!clientUser) return [];

            return await endpoints.projects.getRecommendedProjects(clientUser.id);
        }
    });

    return {
        recommendedProjectsForClientUser: recommendedProjectsForClientUserQuery.data
    }
}