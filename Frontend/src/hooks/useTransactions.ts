import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    handleJoinProjectRequest,
    handleJoinProjectRequestAccept,
    handleLeaveProjectRequest,
    handleKickUserFromProject,
    handleInviteUserToProject,
    handleInviteUserToProjectAccept,
    handleInviteUserToProjectDeny,
} from "../api";

// Define the various transaction types that your hook will handle
type JoinProject = {
    type: 'joinProject',
    userId: string,
    projectId: number
}

type LeaveProject = {
    type: 'leaveProject',
    userId: string,
    projectId: number
}

type InviteUserToProject = {
    type: 'inviteUser',
    userId: string,
    projectId: number
}

type AcceptInvite = {
    type: 'acceptInvite',
    userId: string,
    projectId: number
}

type DenyInvite = {
    type: 'denyInvite',
    userId: string,
    projectId: number
}

type KickUserFromProject = {
    type: 'kickUser',
    userId: string,
    projectId: number
}

export function useTransactions() {
    const queryClient = useQueryClient();

    const joinProjectMutation = useMutation({
        mutationFn: async ({ userId, projectId }: JoinProject) => {
            return await handleJoinProjectRequest(userId, projectId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries( {queryKey:['projects'] });
        }
    });

    const acceptJoinRequestMutation = useMutation({
        mutationFn: async ({ userId, projectId }: JoinProject) => {
            return await handleJoinProjectRequestAccept(userId, projectId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries( {queryKey:['projects'] });
        }
    });

    const leaveProjectMutation = useMutation({
        mutationFn: async ({ userId, projectId }: LeaveProject) => {
            return await handleLeaveProjectRequest(userId, projectId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries( {queryKey:['projects'] });
        }
    });

    const kickUserMutation = useMutation({
        mutationFn: async ({ userId, projectId }: KickUserFromProject) => {
            return await handleKickUserFromProject(userId, projectId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries( {queryKey:['projects'] });
        }
    });

    const inviteUserMutation = useMutation({
        mutationFn: async ({ userId, projectId }: InviteUserToProject) => {
            return await handleInviteUserToProject(userId, projectId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries( {queryKey:['projects'] });
        }
    });

    const acceptInviteMutation = useMutation({
        mutationFn: async ({ userId, projectId }: AcceptInvite) => {
            return await handleInviteUserToProjectAccept(userId, projectId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries( {queryKey:['projects'] });
        }
    });

    const denyInviteMutation = useMutation({
        mutationFn: async ({ userId, projectId }: DenyInvite) => {
            return await handleInviteUserToProjectDeny(userId, projectId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries( {queryKey:['projects'] });
        }
    });

    return {
        joinProject: joinProjectMutation.mutateAsync,
        acceptJoinRequest: acceptJoinRequestMutation.mutateAsync,
        leaveProject: leaveProjectMutation.mutateAsync,
        kickUser: kickUserMutation.mutateAsync,
        inviteUser: inviteUserMutation.mutateAsync,
        acceptInvite: acceptInviteMutation.mutateAsync,
        denyInvite: denyInviteMutation.mutateAsync,
    };
}
