import { endpoints } from "../../api";
import { useClientUser } from "../users";
import { useProjectsOwnedByClientUser } from "./useProjectsOwnedByClientUser";
import { patchProject, ProjectPatchRequest, ProjectResponse } from '../../api/types/projects';

export function useProjectActions() {
    const { addProjectToCache } = useProjectsOwnedByClientUser();
    const { clientUser } = useClientUser();

    const createProjectWithClientAsAuthor = async (
        title: string, description: string, skillTags: string[], interestTags: string[]
    ) => {
        if (!clientUser) return;

        const createdProject = await endpoints.projects.createProject({
            authorId: clientUser.id,
            description,
            title
        });

        const patch: ProjectPatchRequest = {
            authorId: clientUser.id,
            projectId: createdProject.id,
            skillTags,
            interestTags
        }

        await endpoints.projects.updateProject(patch);

        const patchedProject: ProjectResponse = patchProject(createdProject, patch);

        addProjectToCache(patchedProject);

        return patchedProject;
    };

    return {
        createProjectWithClientAsAuthor
    }
}