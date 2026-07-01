import { createFileRoute } from '@tanstack/react-router'
import ProfileEditPage from '@/page/ProfileEditPage'

export const Route = createFileRoute('/profileedit')({
  component: ProfileEditPage,
})
