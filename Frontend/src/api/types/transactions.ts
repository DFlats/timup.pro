import { client } from '../client';

export const handleJoinProjectRequest = async (userId: string, projectId: number) => {
    await client.PUT('/api/Transactions/HandleJoinProjectRequest/{userId}/{projectId}', {
        params: { path: { userId, projectId } }
    });
}

export const handleJoinProjectRequestAccept = async (userId: string, projectId: number) => {
    await client.POST('/api/Transactions/HandleJoinProjectRequest/Accept/{userId}/{projectId}', {
        params: { path: { userId, projectId } }
    });
}

export const handleLeaveProjectRequest = async (userId: string, projectId: number) => {
    await client.PUT('/api/Transactions/HandleLeaveProjectRequest/{userId}/{projectId}', {
        params: { path: { userId, projectId } }
    });
}

export const handleKickUserFromProject = async (userId: string, projectId: number) => {
    await client.PUT('/api/Transactions/HandleKickUserFromProject/{userId}/{projectId}', {
        params: { path: { userId, projectId } }
    });
}

