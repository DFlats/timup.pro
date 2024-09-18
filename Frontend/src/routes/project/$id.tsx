import { createFileRoute } from '@tanstack/react-router'
import { ProjectPage } from '../../components/pages';

export const Route = createFileRoute('/project/$id')({
  component: ProjectPage,
});