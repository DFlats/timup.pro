import { endpoints } from "../../api";

export function useTransactionActions() {
    const joinProjectRequestAccept = async (userId: string, projectId: number) => {
        await endpoints.transactions.joinProjectRequestAccept(userId, projectId);
    }

    return {
        joinProjectRequest: endpoints.transactions.joinProjectRequest,
        joinProjectRequestAccept,
        joinProjectRequestDeny: endpoints.transactions.joinProjectRequestDeny,
        inviteUserToProjectRequest: endpoints.transactions.inviteUserToProject,
        inviteUserToProjectRequestAccept: endpoints.transactions.inviteUserToProjectAccept,
        inviteUserToProjectRequestDeny: endpoints.transactions.inviteUserToProjectDeny,
        leaveProjectRequest: endpoints.transactions.leaveProjectRequest,
        kickUserFromProject: endpoints.transactions.kickUserFromProject,
    }
}