import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../../api";

export function useProjectAuthor(projectId: number) {
    const queryKey = ['users', 'author', 'byProjectId', projectId];

    const query = useQuery({
        queryKey,
        queryFn: async () => {
            const project = await endpoints.projects.getProject(projectId);
            return await endpoints.users.getUserByUserId(project.authorId);
        }
    });

    return {
        author: query.data
    }
}