import { useQuery } from "@tanstack/react-query"
import { useClientUser } from "../hooks"
import { getProjectById, getProjects, Project } from "../api"
import { ProjectFeedType } from "../types/types";

export function useProjects(projectFeed: ProjectFeedType) {
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

    const recommendedProjectsQuery = useQuery({
        queryKey: queryKeyRecommendedProjects,
        queryFn: async (): Promise<Project[]> => {
            if (!clientUser) return [];

            return await getProjects(clientUser.skillTags, clientUser.interestTags);
        },
        enabled: !!clientUser && projectFeed == 'recommended'
    });

    const userProjectsQuery = useQuery({
        queryKey: queryKeyUserProjects,
        queryFn: async () => {
            if (!clientUser) return;
            console.log(clientUser)
            return await Promise.all(clientUser.projectIds.map(async (id) => await getProjectById(id)))
        },
        enabled: !!clientUser && projectFeed == 'user'
    });

    switch (projectFeed) {
        case 'featured':
            return {
                projects: featuredProjectsQuery.data as Project[]
            }
        case 'recommended':
            return {
                projects: recommendedProjectsQuery.data as Project[]
            }
        case 'user':
            return {
                projects: userProjectsQuery.data as Project[]
            }
    }
}