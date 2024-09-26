export type TagType = 'skill' | 'interest';

export type ClientUserInviteToProject = {
    projectId: number
}

export type ProjectPendingInviteRequest = {
    userId: string
}

export type ProjectInvite = {
    projectId: number,
    projectTitle: string,
    userId: string
}