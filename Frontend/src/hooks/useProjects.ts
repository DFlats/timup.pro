import { useQuery } from "@tanstack/react-query";
import { Project } from "../api/types"
import { useClientUser } from "./useClientUser";
import { getProjectById, getProjects } from "../api/endpoints";

export type ProjectFeed = 'featured' | 'recommended' | 'user';

export function useProjects(projectFeed: ProjectFeed) {
    const { clientUser } = useClientUser();

    const queryKeyFeaturedProjects = ['featuredProjects'];
    const queryKeyRecommendedProjects = ['recommendedProjects'];
    const queryKeyUserProjects = ["userProjects"];

    const featuredProjectsQuery = useQuery({
        queryKey: queryKeyFeaturedProjects,
        queryFn: async () => {
            return await getProjects();
        },
        enabled: projectFeed == 'featured'
    });

    const getFeaturedProjects = () => {
        return featuredProjectsQuery.data as Project[] | undefined;
    }

    const recommendedProjectsQuery = useQuery({
        queryKey: queryKeyRecommendedProjects,
        queryFn: async (): Promise<Project[] | undefined> => {
            if (!clientUser) return;

            return await getProjects(clientUser.skillTags, clientUser.interestTags);
        },
        enabled: !!clientUser && projectFeed == 'recommended'
    });

    const getRecommendedProjects = () => {
        return recommendedProjectsQuery.data as Project[] | undefined;
    }

    const userProjectsQuery = useQuery({
        queryKey: queryKeyUserProjects,
        queryFn: async () => {
            if (!clientUser) return;
            return await Promise.all(clientUser.projectIds.map(async (id) => await getProjectById(id)))
        },
        enabled: !!clientUser && projectFeed == 'user'
    });

    const getUserProjects = () => {
        return userProjectsQuery.data as Project[] | undefined;
    }

    switch (projectFeed) {
        case 'featured':
            return {
                projects: getFeaturedProjects()
            }
        case 'recommended':
            return {
                projects: getRecommendedProjects()
            }
        case 'user':
            return {
                projects: getUserProjects()
            }
    }
}