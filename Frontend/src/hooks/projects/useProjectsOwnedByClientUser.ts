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
            return await endpoints.projects.getOwnedProjects(clientUser.id) ?? [];
        }
    });

    const addProjectToCache = (project: Project) => {
        if (!query.data) {
            console.error("no query data");
            return;
        }

        queryClient.setQueryData(queryKey, [...query.data, project])
    }

    return {
        projectsOwnedByClientUser: query.data,
        addProjectToCache
    }
}