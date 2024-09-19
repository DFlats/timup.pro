/* eslint-disable react/react-in-jsx-scope */

export function ProjectPage() {
    // const Route = getRouteApi('/project/$id');
    // const id = Number.parseInt(Route.useParams().id);
    // const { projects, project } = useProjects('ownedByUser', id);

    return (
        <><div className="hero bg-base-200 min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Hello there</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
        </>);

    // if (!project) {
    //     return <p>{`Project (${id}) could not be found`}</p>
    // }

    // const ownedProject = projects ? projects.some(p => p.id == project.id) : false;

    // return (
    //     <>
    //         {ownedProject && <h2>Your project</h2>}
    //         <ProjectCard project={project} />
    //         {/* <UserTable projectId={project.id}/> */}
    //     </>)


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