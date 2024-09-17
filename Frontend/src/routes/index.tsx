/* eslint-disable react/react-in-jsx-scope */
import { createFileRoute } from '@tanstack/react-router'
import ProjectFeed from '../components/ProjectFeed';

export const Route = createFileRoute('/')({
  component: Home
})

function Home() {
  return (
    <ProjectFeed />
  );
}

