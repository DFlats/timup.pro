/* eslint-disable react/react-in-jsx-scope */
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile')({
  component: ProfilePage
})

function ProfilePage() {
  return <p>ProfilePage</p>
}