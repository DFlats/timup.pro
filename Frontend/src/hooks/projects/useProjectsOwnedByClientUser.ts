import { useQueryClient, useQuery } from "@tanstack/react-query";
import { endpoints } from "../../api";
import { Project } from "../../types";

export function useProjectsOwnedByClientUser(userId: string) {
    const queryClient = useQueryClient();

    const queryKey = ["projects", "ownedByClientUser"];

    const query = useQuery({
        queryKey: [userId],
        queryFn: async () => {
            return (await endpoints.projects.getOwnedProjects(userId)).projects ?? [];
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