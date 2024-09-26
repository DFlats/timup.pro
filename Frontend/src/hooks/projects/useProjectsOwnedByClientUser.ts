import { useQueryClient, useQuery } from "@tanstack/react-query";
import { endpoints } from "../../api";
import { useClientUser } from "../users";
import { Project } from "../../types";

export function useProjectsOwnedByClientUser() {
    const { clientUser } = useClientUser();
    const queryClient = useQueryClient();

    const queryKey = ["projects", "ownedByClientUser"];

    const query = useQuery({
        queryKey,
        queryFn: async () => {
            if (!clientUser) return [];
            return (await endpoints.projects.getOwnedProjects(clientUser.id)).projects ?? [];
        },
        enabled: !!clientUser
    });

    const addProjectToCache = (project: Project) => {
        if (!query.data) {
            console.error("no query data");
            return;
        }

        queryClient.setQueryData(queryKey, [...query.data, project])
    }

    const projectsAuthoredByClientUser = () => {
        if (!query.data || !clientUser) return;

        return query.data.filter(project => project.authorId == clientUser.id);
    }

    return {
        projectsOwnedByClientUser: query.data,
        projectsAuthoredByClientUser: projectsAuthoredByClientUser(),
        addProjectToCache
    }
}