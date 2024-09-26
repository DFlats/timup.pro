import { useQuery, useQueryClient } from "@tanstack/react-query";
import { endpoints } from "../../api";
import { useProjectsOwnedByClientUser } from "../projects";
import { ProjectInvite } from "../../types";

export function useClientProjectInvites() {
    const { projectsAuthoredByClientUser } = useProjectsOwnedByClientUser();
    const queryClient = useQueryClient();
    const queryKey = ['invites', 'project', 'clientUser'];

    const query = useQuery({
        queryKey,
        queryFn: async () => {
            if (!projectsAuthoredByClientUser) {
                console.error('projectsOwnedByClientUser is undefined');
                return;
            }

            return (await Promise.all(
                projectsAuthoredByClientUser.map(async (project) => {
                    const projectInvites = await endpoints.transactions.getProjectInvites(project.id);
                    return await Promise.all(
                        projectInvites.map(async (projectInvite) => ({
                            projectId: project.id,
                            projectTitle: project.title,
                            userId: projectInvite.userId,
                            userName: (await endpoints.users.getUserByUserId(projectInvite.userId)).name
                        } as ProjectInvite)));
                })
            )).flat();
},
enabled: !!projectsAuthoredByClientUser
    });

const acceptInviteRequest = async (invite: ProjectInvite) => {
    await endpoints.transactions.joinProjectRequestAccept(invite.userId, invite.projectId);
    queryClient.invalidateQueries({ queryKey });
    queryClient.invalidateQueries({ queryKey: ["projects", "ownedByClientUser"] });
}

const denyInviteRequest = async (invite: ProjectInvite) => {
    await endpoints.transactions.joinProjectRequestDeny(invite.userId, invite.projectId);
    queryClient.invalidateQueries({ queryKey });
}

return {
    clientProjectInvites: query.data,
    acceptInviteRequest,
    denyInviteRequest,
}
}