/* eslint-disable react/react-in-jsx-scope */
import { getRouteApi } from "@tanstack/react-router";
import { useProjects } from "../../hooks";
import { ProjectCard } from "../projects";

export function ProjectPage() {
    const Route = getRouteApi('/project/$id');
    const id = Number.parseInt(Route.useParams().id);
    const { projects, project } = useProjects('user', id);

    if (!project) {
        return <p>{`Project (${id}) could not be found`}</p>
    }

    const ownedProject = projects ? projects.some(p => p.id == project.id) : false;

    return (
        <>
            {ownedProject && <h2>Your project</h2>}
            <ProjectCard project={project} />
            {/* <UserTable projectId={project.id}/> */}
        </>)


    // return (
    //     <>
    //         <h1 className='text-4xl mb-8'>Projects you are in</h1>
    //         {projects?.map(project => <ProjectCard key={project.title} project={project} />)}
    //         <button onClick={handleModal} className="button button-primary flex justify-center items-center m-4 w-96 h-96 shadow-xl">
    //             <div className="text-8xl">+</div>
    //         </button>
    //         <CreateProjectModal />
    //     </>
    // );
}