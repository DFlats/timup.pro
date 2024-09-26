import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../../api";
import { useClientUser } from "./useClientUser";

export function useProjectAuthor(projectId: number) {
    const { clientUser } = useClientUser();
    const queryKey = ['users', 'author', 'byProjectId', projectId];

    const query = useQuery({
        queryKey,
        queryFn: async () => {
            const project = await endpoints.projects.getProject(projectId);
            return await endpoints.users.getUserByUserId(project.authorId);
        }
    });

    const clientUserIsAuthor =
        (clientUser && query.data && clientUser.id == query.data.id)

    return {
        author: query.data,
        clientUserIsAuthor
    }
}