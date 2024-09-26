import { Tags } from "./tags";

export type ProjectCore = {
    authorId: string;
    title: string;
    description: string;
}

export type Project = ProjectCore & {
    id: number;
    authorName: string;
    collaborators: UserIdName[],
    tags: Tags,
    isCompleted: boolean,
    pendingInvites: string[],
    joinRequests: string[],
    imageUrl?: string
}

export type UserIdName = Record<string, string>;

export type ProjectPatch = {
    title?: string;
    description?: string;
    tags?: Tags,
    isCompleted?: boolean
}

export type ProjectBatch = {
    projects: Project[],
    currentPage: number,
    nextPage?: number
}