/* eslint-disable react/react-in-jsx-scope */
import { createFileRoute } from '@tanstack/react-router'
import { ProjectFeed } from '../components/';
import { useClientUser } from '../hooks';
import { ProjectFeedType } from '../types/types';

export const Route = createFileRoute('/')({
  component: HomePage
})

function HomePage() {
  const { clientUser } = useClientUser();

  const projectFeed = (): ProjectFeedType => {
    if (clientUser)
      return 'recommended'
    else
      return 'featured'
  }

  return (

    <ProjectFeed projectFeed={projectFeed()} />
  );
}

