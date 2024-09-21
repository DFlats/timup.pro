import { components } from "../schema";

export type IdName = {
    id: string,
    name: string
}

export type Project = {
    id: number;
    title: string;
    authorName: string;
    authorId: string;
    collaborators: IdName[],
    description: string;
    skillTags: string[];
    interestTags: string[];
    isCompleted: boolean;
    invitedUsersIds: string[];
}

export function projectFromProjectResponse(dto: components['schemas']['ProjectResponse']) {
    return {
        id: dto.id!,
        title: dto.title!,
        authorName: dto.authorName!,
        authorId: dto.authorId!,
        collaborators: dto.collaborators!.map(dto => {
            return {
                id: dto.clerkId,
                name: dto.name
            }
        }),
        description: dto.description!,
        skillTags: dto.skillTags!,
        interestTags: dto.interestTags!,
        isCompleted: dto.isCompleted!,
        invitedUsersIds: dto.invitedUsers!
    } as Project;
}

export function projectFromProjectOverviewResponse(dto: components['schemas']['ProjectOverviewResponse']) {
    return {
        id: dto.id!,
        title: dto.title!,
        authorName: "ProjectOverviewResponse",
        authorId: dto.authorId!,
        collaborators: [],
        description: dto.description!,
        skillTags: dto.skillTags!,
        interestTags: dto.interestTags!,
        isCompleted: dto.isCompleted!,
        invitedUsersIds: []
    } as Project;
}

export type ProjectCore = {
    authorId: string;
    title: string;
    description: string;
}

export type ProjectPatch = {
    projectId: number;
    authorId: string;
    title?: string;
    description?: string;
    skillTags?: string[];
    interestTags?: string[];
    isCompleted?: boolean;
}

export function patchProject(project: Project, patch: ProjectPatch) {
    return {
        ...project,
        ...patch
    } as Project;
}