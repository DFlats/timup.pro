import { endpoints } from "../../api";
import { useClientUser } from "../users";
import { useProjectsOwnedByClientUser } from "./useProjectsOwnedByClientUser";
import { ProjectPatch } from '../../types/projects';
import { Tags } from "../../types";

export function useProjectActions() {
    const { addProjectToCache } = useProjectsOwnedByClientUser();
    const { clientUser } = useClientUser();

    const createProjectWithClientAsAuthor = async (
        title: string, description: string, tags: Tags
    ) => {
        if (!clientUser) return;

        const createdProject = await endpoints.projects.createProject({
            authorId: clientUser.id,
            description,
            title
        });

        const patch: ProjectPatch = {
            tags
        }

        const patchedProject = await endpoints.projects.updateProject(patch, createdProject.id, createdProject.authorId);

        console.log(patchedProject);
        
        addProjectToCache(patchedProject);

        return patchedProject;
    };

    return {
        createProjectWithClientAsAuthor
    }
}