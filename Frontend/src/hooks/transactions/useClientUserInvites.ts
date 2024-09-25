import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useClientUser } from "../users";
import { endpoints } from "../../api";

export function useClientUserInvites() {
    const { clientUser } = useClientUser();
    const queryClient = useQueryClient();
    const queryKey = ['invites', 'clientUser'];

    type ProjectInvite = {
        title: string,
        id: number
    }

    const query = useQuery({
        queryKey,
        queryFn: async () => {
            if (!clientUser) {
                console.error('clientUser is undefined');
                return;
            }

            const invites = await endpoints.transactions.getUserInvites(clientUser.id);
            const projects = await Promise.all(invites.map(async (invite) => await endpoints.projects.getProject(invite.projectId)));
            return projects.map(project => ({ title: project.title, id: project.id } as ProjectInvite));
        },
        enabled: !!clientUser
    });

    const acceptInvite = async (projectId: number) => {
        if (!clientUser) {
            console.error("clientUser is not defined");
            return;
        }

        await endpoints.transactions.inviteUserToProjectAccept(clientUser.id, projectId);

        queryClient.invalidateQueries({ queryKey });
    }

    const denyInvite = async (projectId: number) => {
        if (!clientUser) {
            console.error("clientUser is not defined");
            return;
        }

        await endpoints.transactions.inviteUserToProjectDeny(clientUser.id, projectId);

        queryClient.invalidateQueries({ queryKey });
    }

    return {
        projectsInvitedTo: query.data,
        acceptInvite,
        denyInvite,
    }
}