/* eslint-disable react/react-in-jsx-scope */
import { getRouteApi } from "@tanstack/react-router";
import { useProjects } from "../../hooks";
import { NotFound } from "../routing";
import { UserTable } from "../users";
import { TagContainer } from "../tags";

export function ProjectPage() {
    const Route = getRouteApi('/project/$id');
    const projectId = Number.parseInt(Route.useParams().id);
    const { projectById: project } = useProjects({ type: 'projectById', projectId });
    const { projectsOwnedByClientUser } = useProjects({ type: 'projectsOwnedByClientUser' });

    if (!project) {
        return (<NotFound>
            <p>{`Sorry, project with id ${projectId} doesn't exist ${String.raw`¯\_(ツ)_/¯`}`}</p>
        </NotFound>)
    }

    const clientOwnsProject =
        projectsOwnedByClientUser
            ? projectsOwnedByClientUser.some(p => p.id == project.id)
            : false;

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
            <TagContainer tags={project.skillTags} tagType='skill' />
            <TagContainer tags={project.interestTags} tagType='interest' />
            <UserTable project={project} />
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