import { TopBarBoard } from '@/features/tasks/components/TopBarBoard'
import { TaskBoard } from '@/features/tasks/components/TaskBoard'
import { Header } from '@/components/layout/Header'

export function Home() {
  return (
    <main className="mx-auto max-w-7xl px-6">
      <Header />
      <TopBarBoard />
      <TaskBoard />
    </main>
  )
}
