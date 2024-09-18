import { useQuery } from "@tanstack/react-query";
import { Project } from "../api/types"
import { useClientUser } from "./useClientUser";
import { getProjectById, getProjects } from "../api/endpoints";

export function useProjects() {
    const { clientUser } = useClientUser();

    const queryKeyPublicProjects = ['publicProjects'];
    const queryKeyRecommendedProjects = ['recommendedProjects'];
    const queryKeyUserProjects = ["userProjects"];

    const generalProjectsQuery = useQuery({
        queryKey: queryKeyPublicProjects,
        queryFn: async () => {
            return await getProjects();
        },
    });

    const getPublicProjects = () => {
        return generalProjectsQuery.data as Project[] | undefined;
    }

    const projectsQuery = useQuery({
        queryKey: queryKeyRecommendedProjects,
        queryFn: async (): Promise<Project[] | undefined> => {
            if (!clientUser) return;

            return await getProjects(clientUser.skillTags, clientUser.interestTags);
        },
        enabled: !!clientUser
    });

    const getRecommendedProjects = () => {
        return projectsQuery.data as Project[] | undefined;
    }

    const userProjectsQuery = useQuery({
        queryKey: queryKeyUserProjects,
        queryFn: async () => {
            if (!clientUser) return;
            //TODO: Use real implemented endpoint
            return await Promise.all(clientUser.projectIds.map(async (id) => await getProjectById(id)))
        },
        enabled: !!clientUser
    });

    const getUserProjects = () => {
        return userProjectsQuery.data as Project[] | undefined;
    }

    return {
        allProjects: getPublicProjects(),
        projectsForUser: getRecommendedProjects(),
        userProjects: getUserProjects()
    }
}