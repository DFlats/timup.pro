export type ProjectCore = {
    authorId: string;
    title: string;
    description: string;
}

export type Project = ProjectCore & {
    id: number;
    authorName: string;
    collaborators: IdName[],
    skillTags: string[];
    interestTags: string[];
    isCompleted: boolean;
    invitedUsersIds: string[];
}

export type IdName = {
    id: string,
    name: string
}

export type ProjectPatch = {
    title?: string;
    description?: string;
    skillTags?: string[];
    interestTags?: string[];
    isCompleted?: boolean;
}