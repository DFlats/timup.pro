/* eslint-disable react/react-in-jsx-scope */
import { getRouteApi } from "@tanstack/react-router";
import { useProjectById, useProjectsOwnedByClientUser } from "../../hooks/projects";
import { NotFound } from "../routing";
import { UserTable } from "../users";
import { TagContainer } from "../tags";
import { useCollaborators } from "../../hooks/users/useCollaborators";
import { User } from "../../types";

export function ProjectPage() {
    const Route = getRouteApi('/project/$id');
    const projectId = Number.parseInt(Route.useParams().id);
    const { projectById: project } = useProjectById(projectId);
    const { projectsOwnedByClientUser } = useProjectsOwnedByClientUser();
    let { collaboratorsInProject } = useCollaborators(projectId);

    if (!project) {
        return (<NotFound>
            <p>{`Sorry, project with id ${projectId} doesn't exist ${String.raw`¯\_(ツ)_/¯`}`}</p>
        </NotFound>)
    }

    const clientOwnsProject =
        projectsOwnedByClientUser
            ? projectsOwnedByClientUser.some(p => p.id == project.id)
            : false;

    if (!collaboratorsInProject) return;

    console.log(project.tags['interest']);

    collaboratorsInProject = collaboratorsInProject.map(collaborator => ({
        ...collaborator,
        tags: {
            'skill': collaborator.tags['skill']
                .filter(tag => project.tags['skill']
                    .map(pTag => pTag.title).includes(tag.title)),
            'interest': collaborator.tags['interest']
                .filter(tag => project.tags['interest']
                    .map(pTag => pTag.title).includes(tag.title)),
        }
    } as User));

    console.log(collaboratorsInProject);

    return (
        <><div
            className="hero min-h-screen"
            style={{
                backgroundImage: "url(https://storage.googleapis.com/pod_public/1300/141876.jpg)",
            }}>
            <div className="hero-overlay bg-opacity-95"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-screen-lg">
                    <h1 className="text-5xl font-bold">{project.title}</h1>
                    <p className="py-6">{project.description}</p>
                    {clientOwnsProject &&
                        <p>You are a part of this project</p>
                    }
                    <TagContainer tags={project.tags['skill']} tagType='skill' />
                    <TagContainer tags={project.tags['interest']} tagType='interest' />
                    {collaboratorsInProject &&
                        <UserTable users={collaboratorsInProject} />
                    }
                </div>
            </div>
        </div>
        </>);


    // return (
    //     <>
    //         {ownedProject && <h2>Your project</h2>}
    //         <ProjectCard project={project} />
    //         {/* <UserTable projectId={project.id}/> */}
    //     </>)
}