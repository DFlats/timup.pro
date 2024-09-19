import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useClientUser } from "../hooks"
import { getProjectsByFilter, getProjectsByUserId, Project } from "../api"
import { ProjectFeedType } from "../types/types";

export function useProjects(projectFeed: ProjectFeedType) {
    const { clientUser } = useClientUser();
    const queryClient = useQueryClient();

    const queryKeyFeaturedProjects = ['featuredProjects'];
    const queryKeyRecommendedProjects = ['recommendedProjects'];
    const queryKeyUserProjects = ["userProjects"];

    const featuredProjectsQuery = useQuery({
        queryKey: queryKeyFeaturedProjects,
        queryFn: async () => {
            return await getProjectsByFilter();
        },
        enabled: projectFeed == 'featured'
    });

    const recommendedProjectsQuery = useQuery({
        queryKey: queryKeyRecommendedProjects,
        queryFn: async (): Promise<Project[]> => {
            if (!clientUser) return [];

            return await getProjectsByFilter(clientUser.skillTags, clientUser.interestTags);
        },
        enabled: !!clientUser && projectFeed == 'recommended'
    });

    const userProjectsQuery = useQuery({
        queryKey: queryKeyUserProjects,
        queryFn: async () => {
            if (!clientUser) return;
            return await getProjectsByUserId(clientUser.id);
        },
        enabled: !!clientUser && projectFeed == 'user'
    });

    const addUserProject = (project: Project) => {
        const existingProjects = userProjectsQuery.data as Project[];
        queryClient.setQueryData(queryKeyUserProjects, [...existingProjects, project]);
    }


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
                projects: userProjectsQuery.data as Project[],
                addUserProject
            }
    }
}