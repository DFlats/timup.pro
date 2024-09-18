/* eslint-disable react/react-in-jsx-scope */
import { createFileRoute } from '@tanstack/react-router'
import { ProjectFeed } from '../components/';

export const Route = createFileRoute('/')({
  component: HomePage
})

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <ProjectFeed />
    </div>
  );
}

