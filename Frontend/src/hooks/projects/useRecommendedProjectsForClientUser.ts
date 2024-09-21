import { useQuery } from "@tanstack/react-query";
import { Project, endpoints } from "../../api";
import { useClientUser } from "../users";

export function useRecommendedProjectsForClientUser() {
    const { clientUser } = useClientUser()
    const queryKey = ['projects', 'recommendedForClientUser'];

    const recommendedProjectsForClientUserQuery = useQuery({
        queryKey,
        queryFn: async (): Promise<Project[]> => {
            if (!clientUser) return [];

            return await endpoints.projects.getRecommendedProjectsByUserId(clientUser.id);
        }
    });

    return {
        recommendedProjectsForClientUser: recommendedProjectsForClientUserQuery.data
    }
}