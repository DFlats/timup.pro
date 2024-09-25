import { Invite } from '../../types';
import { client } from '../client';
import { components } from '../schema';

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
        throw error;
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
    const { response, data, error } = await client.GET('/api/Transactions/GetUserInvites/{userId}', {
        params: { path: { userId } }
    });

    if (!data || (!response.ok && error))
        throw error;

    return data.map(invite => inviteFromProjectInviteResponse(invite));
}

export const getProjectInvites = async (projectId: number) => {
    const { response, data, error } = await client.GET('/api/Transactions/GetProjectInvites/{projectId}', {
        params: { path: { projectId } }
    });

    if (!data || (!response.ok && error))
        throw error;

    return data.map(invite => inviteFromProjectInviteResponse(invite));
}

function inviteFromProjectInviteResponse(dto: components['schemas']['ProjectInviteResponse']) {
    return {
        userId: dto.userId!,
        projectId: dto.projectId!
    } as Invite;
}

