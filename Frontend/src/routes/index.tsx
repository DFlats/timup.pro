/* eslint-disable react/react-in-jsx-scope */
import { createFileRoute } from '@tanstack/react-router'
import ProjectFeed from '../components/projectFeed';

export const Route = createFileRoute('/')({
  component: Home
})

function Home() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <ProjectFeed />
    </div>
  );
}

