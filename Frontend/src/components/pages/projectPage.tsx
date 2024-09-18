/* eslint-disable react/react-in-jsx-scope */
import { getRouteApi } from "@tanstack/react-router";
import { useProject } from "../../hooks";


export function ProjectPage() {
    const Route = getRouteApi('/project/$id');
    const id = Number.parseInt(Route.useParams().id);
    const { project } = useProject(id);
    return (<p>{`Project page for ${id}`}</p>);
    // const { project } = useProject(id);

    // function handleModal() {
    //   const modal = document.getElementById("create-project") as HTMLDialogElement;
    //   modal.showModal();
    // }


    // return (
    //   <>
    //     <h1 className='text-4xl mb-8'>Projects you are in</h1>
    //     {projects?.map(project => <ProjectCard key={project.title} project={project} />)}
    //     <button onClick={handleModal} className="button button-primary flex justify-center items-center m-4 w-96 h-96 shadow-xl">
    //       <div className="text-8xl">+</div>
    //     </button>
    //     <CreateProjectModal />
    //   </>
    // );
}