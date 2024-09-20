import { components } from "../schema";

export type ProjectResponse = {
    id: number;
    title: string;
    authorName: string;
    authorId: string;
    collaborators: components['schemas']['ValueTupleOfStringAndString'][]
    description: string;
    skillTags: string[];
    interestTags: string[];
    isCompleted: boolean;
    invitedUsersIds: string[];
}

// components['schemas']['ProjectRequest']
export type ProjectRequest = {
    authorId: string;
    title: string;
    description: string;
}

// components['schemas']['ProjectOverviewResponse']
export type ProjectOverviewResponse = {
    id: number;
    title: string;
    authorId: string;
    collabCount: number;
    description: string;
    skillTags: string[];
    interestTags: string[];
    isCompleted: boolean;
}

// components['schemas']['ProjectOverviewResponse']
export type ProjectPatchRequest = {
    projectId: number;
    authorId: string;
    title?: string;
    description?: string;
    skillTags?: string[];
    interestTags?: string[];
    isCompleted?: boolean;
}

export function mapRawProjectResponseToProject(projectResponse: components['schemas']['ProjectResponse']) {
    return {
        id: projectResponse.id!,
        title: projectResponse.title!,
        authorName: projectResponse.authorName!,
        authorId: projectResponse.authorId!,
        //TODO: Figure out how NameId works
        collaborators: [],
        description: projectResponse.description!,
        skillTags: projectResponse.skillTags!,
        interestTags: projectResponse.interestTags!,
        isCompleted: projectResponse.isCompleted!,
        invitedUsersIds: projectResponse.invitedUsers!
    } as ProjectResponse;
}