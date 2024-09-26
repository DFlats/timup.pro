import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../../api";

export function useProjectInvites(projectId: number) {
    const queryKey = ['invites', 'projectById', projectId];

    const query = useQuery({
        queryKey,
        queryFn: async () => {
            const invites = await endpoints.transactions.getProjectInvites(projectId);
            return invites;
        }
    });

    return {
        projectInvites: query.data
    }
}