/* eslint-disable react/react-in-jsx-scope */
import { createFileRoute } from '@tanstack/react-router'
import useClientUser from '../hooks/useClientUser';
import ProjectCard from '../components/ProjectCard';

export const Route = createFileRoute('/projects')({
  component: Projects
})

function Projects() {
  const { clientUser } = useClientUser();

  return (
    <div className="p-12 w-screen flex flex-col items-center justify-center">
      <h1 className='text-4xl mb-8'>Projects you are in</h1>
      {clientUser?.projects?.map(project => <ProjectCard key={project.title} project={project} />)}
    </div>
  );
}