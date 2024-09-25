import { ClientUserInviteToProject, ProjectPendingInviteRequest } from '../../types';
import { client } from '../client';

export const joinProjectRequest = async (userId: string, projectId: number) => {
    const { response, error } = await client.POST('/api/Transactions/JoinProjectRequest/{userId}/{projectId}', {
        params: { path: { userId, projectId } }
    });

    if (!response.ok && error)
        throw error;
}

export const joinProjectRequestAccept = async (userId: string, projectId: number) => {
    const { response, error } = await client.PUT('/api/Transactions/JoinProjectRequest/Accept/{userId}/{projectId}', {
        params: { path: { userId, projectId } }
    });

    if (!response.ok && error)
        throw error;
}

export const joinProjectRequestDeny = async (userId: string, projectId: number) => {
    const { response, error } = await client.PUT('/api/Transactions/JoinProjectRequest/Deny/{userId}/{projectId}', {
        params: { path: { userId, projectId } }
    });

    if (!response.ok && error)
        throw error;
}

export const inviteUserToProject = async (userId: string, projectId: number) => {
    const { response, error } = await client.POST('/api/Transactions/InviteUserToProject/{userId}/{projectId}', {
        params: { path: { userId, projectId } }
    });

    if (!response.ok && error)
        throw new Error(error);
}

export const inviteUserToProjectAccept = async (userId: string, projectId: number) => {
    const { response, error } = await client.PUT('/api/Transactions/InviteUserToProject/Accept/{userId}/{projectId}', {
        params: { path: { userId, projectId } }
    });

    if (!response.ok && error)
        throw error;
}

export const inviteUserToProjectDeny = async (userId: string, projectId: number) => {
    const { response, error } = await client.PUT('/api/Transactions/InviteUserToProject/Deny/{userId}/{projectId}', {
        params: { path: { userId, projectId } }
    });

    if (!response.ok && error)
        throw error;
}

export const leaveProjectRequest = async (userId: string, projectId: number) => {
    const { response, error } = await client.DELETE('/api/Transactions/LeaveProjectRequest/{userId}/{projectId}', {
        params: { path: { userId, projectId } }
    });

    if (!response.ok && error)
        throw error;
}

export const kickUserFromProject = async (userId: string, projectId: number) => {
    const { response, error } = await client.DELETE('/api/Transactions/KickUserFromProject/{userId}/{projectId}', {
        params: { path: { userId, projectId } }
    });

    if (!response.ok && error)
        throw error;
}

export const getUserInvites = async (userId: string) => {
    const { response, data, error } = await client.GET('/api/Transactions/GetInvites/{userId}', {
        params: { path: { userId } }
    });

    if (!data || (!response.ok && error))
        throw error;

    return data.map(invite => ({ projectId: invite } as ClientUserInviteToProject));
}

export const getProjectInvites = async (projectId: number) => {
    const { response, data, error } = await client.GET('/api/Transactions/GetJoinRequests/{projectId}', {
        params: { path: { projectId } }
    });

    if (!data || (!response.ok && error))
        throw error;

    return data.map(invite => ({ userId: invite } as ProjectPendingInviteRequest));
}
