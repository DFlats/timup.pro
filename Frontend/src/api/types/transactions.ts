import { client } from '../client';
import { components, paths } from '../schema';

export const handleJoinProjectRequest = async (userId: string, projectId: number) => {
    const response = await client.PUT('/api/Transactions/HandleJoinProjectRequest/{userId}/{projectId}', {
        params: { path: { userId, projectId } }
    });
}