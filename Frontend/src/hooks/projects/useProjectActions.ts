import { endpoints } from "../../api";
import { useClientUser } from "../users";
import { useProjectsOwnedByClientUser } from "./useProjectsOwnedByClientUser";
import { ProjectPatch } from '../../api/types/projects';

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

        const patch: ProjectPatch = {
            skillTags,
            interestTags
        }

        const patchedProject = await endpoints.projects.updateProject(patch, createdProject.id, createdProject.authorId);

        addProjectToCache(patchedProject);

        return patchedProject;
    };

    return {
        createProjectWithClientAsAuthor
    }
}