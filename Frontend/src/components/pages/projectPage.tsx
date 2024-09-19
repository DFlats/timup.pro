/* eslint-disable react/react-in-jsx-scope */
import { getRouteApi } from "@tanstack/react-router";
import { useProjects } from "../../hooks";
import { ProjectCard } from "../projects";


export function ProjectPage() {
    const Route = getRouteApi('/project/$id');
    const id = Number.parseInt(Route.useParams().id);
    const { projects, project } = useProjects('user', id);

    console.log("ProjectPage");
    console.log(project);
    console.log(projects);

    if (!project) {
        return <p>{`Project (${id}) could not be found`}</p>
    }

    const ownedProject = projects ? projects.some(p => p.id == project.id) : false;

    // function handleModal() {
    //     const modal = document.getElementById("create-project") as HTMLDialogElement;
    //     modal.showModal();
    // }

    return (
        <>
            {ownedProject && <h2>Your project</h2>}
            <ProjectCard project={project} />
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