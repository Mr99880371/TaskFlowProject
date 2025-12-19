import { TopBarBoard } from '@/features/tasks/TopBarBoard'
import { TaskBoard } from '@/features/tasks/TaskBoard'
import { Header } from '@/components/Header'
import { Dashboard } from '@/features/dashboard/Dashboard'

export function Home() {
  return (
    <main className="mx-auto max-w-7xl px-6">
      <Header />
      <TopBarBoard />
      <Dashboard />
      <TaskBoard />
    </main>
  )
}
