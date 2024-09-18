import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "../api";

export function useProject(id: number) {
    const queryKeyProject = ["idProject", id];

    const projectQuery = useQuery({
        queryKey: queryKeyProject,
        queryFn: async () => {
            return await getProjectById(id);
        },
    });

    return {
        project: projectQuery.data
    }
}