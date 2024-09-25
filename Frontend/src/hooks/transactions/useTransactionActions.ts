import { endpoints } from "../../api";

export function useTransactions() {
    return {
        joinProjectRequest: endpoints.transactions.joinProjectRequest,
        joinProjectRequestAccept: endpoints.transactions.joinProjectRequestAccept,
        joinProjectRequestDeny: endpoints.transactions.joinProjectRequestDeny,
        inviteUserToProjectRequest: endpoints.transactions.inviteUserToProject,
        inviteUserToProjectRequestAccept: endpoints.transactions.inviteUserToProjectAccept,
        inviteUserToProjectRequestDeny: endpoints.transactions.inviteUserToProjectDeny,
        leaveProjectRequest: endpoints.transactions.leaveProjectRequest,
        kickUserFromProject: endpoints.transactions.kickUserFromProject,
    }
}