/* eslint-disable react/react-in-jsx-scope */
import { createFileRoute } from '@tanstack/react-router'
import useClientUser from '../hooks/useClientUser';
import ProjectCard from '../components/ProjectCard';
import { CreateProjectModal } from '../components/CreateProjectModal';

export const Route = createFileRoute('/projects')({
  component: Projects
})

function Projects() {
  const { clientUser } = useClientUser();

  function handleModal() {
    const modal = document.getElementById("create-project") as HTMLDialogElement;
    modal.showModal();
  }

  return (
    <div className="p-12 w-screen flex flex-col items-center justify-center">
      <h1 className='text-4xl mb-8'>Projects you are in</h1>
      {clientUser?.projects?.map(project => <ProjectCard key={project.title} project={project} />)}
      <button onClick={handleModal} className="button button-primary flex justify-center items-center m-4 w-96 h-96 shadow-xl">
        <div className="text-8xl">+</div>
      </button>
      <CreateProjectModal />
    </div>
  );
}