import { createFileRoute } from '@tanstack/react-router'
import { ProfilePage } from '../../components/pages'

export const Route = createFileRoute('/profile/$userId')({
  component: ProfilePage
});
