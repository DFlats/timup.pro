import { useQuery } from "@tanstack/react-query";
import { Project } from "../api/types"
import { useClientUser } from "./useClientUser";
import { getProjects } from "../api/endpoints";

export function useProjects() {
    const { clientUser } = useClientUser();

    const queryKeyGeneralProjects = ['hotprojects'];
    const queryKeyUserProjects = ['projects'];

    const generalProjectsQuery = useQuery({
        queryKey: queryKeyGeneralProjects,
        queryFn: async () => {
            return await getProjects();
        },
    });

    const getGeneralProjects = () => {
        return generalProjectsQuery.data as Project[] | undefined;
    }

    const projectsQuery = useQuery({
        queryKey: queryKeyUserProjects,
        queryFn: async (): Promise<Project[] | undefined> => {
            if (!clientUser) return;

            return await getProjects(clientUser.skillTags, clientUser.interestTags);
        },
        enabled: !!clientUser
    });

    const getUserProjects = () => {
        return projectsQuery.data as Project[] | undefined;
    }

    return {
        allProjects: getGeneralProjects(),
        projectsForUser: getUserProjects()
    }
}