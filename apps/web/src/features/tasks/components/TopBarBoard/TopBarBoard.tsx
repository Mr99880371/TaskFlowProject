import { useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { TaskForm } from '@/features/tasks/components/TaskForm/TaskForm'

export function TopBarBoard() {
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false)

  return (
    <>
      <div className="mb-12 mt-12 flex items-center justify-between">
        {/* Left */}
        <h1 className="font-josefin text-[20px] font-normal text-zinc-900">
          Gerenciador de Projetos
        </h1>

        {/* Right */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900">
            <SlidersHorizontal size={16} />
            Filtros
          </button>

          <button
            onClick={() => setIsTaskFormOpen(true)}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            + Nova tarefa
          </button>
        </div>
      </div>

      {isTaskFormOpen && (
        <TaskForm onClose={() => setIsTaskFormOpen(false)} />
      )}
    </>
  )
}
