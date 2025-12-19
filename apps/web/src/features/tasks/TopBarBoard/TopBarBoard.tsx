import { useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { TaskForm } from '@/features/tasks/TaskForm/TaskForm'
import { useAppDispatch } from '@/store/hooks'
import { toggleStatusFilter, setResponsibleFilter } from '@/store/filters/filters.slice'
import { TaskStatus } from '@taskflow/types'

const STATUS_LABELS: Record<TaskStatus, string> = {
  TODO: 'A fazer',
  IN_PROGRESS: 'Em progresso',
  DELAYED: 'Atrasadas',
  DONE: 'Concluídas',
}


export function TopBarBoard() {
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false)
  const [open, setOpen] = useState(false)
  

  const dispatch = useAppDispatch()

  return (
    <>
      <div className="mb-8 sm:mb-12 mt-8 sm:mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="font-josefin text-[23px] font-normal text-zinc-900">
          Gerenciador de Projetos
        </h1>

  
        <div className="flex items-center justify-between">
          <div className="relative">
            <button
              onClick={() => setOpen(v => !v)}
              className="flex items-center px-4 py-2 sm:p-6 gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 focus:outline-none focus:ring-offset-2"
              aria-expanded={open}
              aria-controls="filter-menu"
              aria-label="Abrir e fechar filtros"
            >
              <SlidersHorizontal size={16} />
              <span className="hidden sm:inline">Filtros</span>
            </button>

            {open && (
              <div id="filter-menu" className="absolute left-0 sm:left-auto sm:right-0 top-full z-50 mt-2 w-64 rounded-md bg-white p-4 shadow-md space-y-4">
                <p className="text-sm font-medium text-zinc-800">
                  Filtros
                </p>

          
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-600">
                    Responsável
                  </label>

                  <input
                    type="text"
                    placeholder="ex: Maria"
                    className="w-full rounded-md border border-zinc-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={e =>
                      dispatch(setResponsibleFilter(e.target.value))
                    }
                  />
                </div>

            
                <div className="space-y-2">
                  <p className="text-xs font-medium text-zinc-600">
                    Status
                  </p>

                  {(Object.keys(STATUS_LABELS) as TaskStatus[]).map(
                    status => (
                      <label
                            key={status}
                            className="flex items-center gap-2 text-sm text-zinc-600"
                          >
                            <input
                              type="checkbox"
                              onChange={() =>
                                dispatch(toggleStatusFilter(status))
                              }
                            />
                            {STATUS_LABELS[status]}
                          </label>
                        )
                      )}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsTaskFormOpen(true)}
            className="flex-1 sm:flex-none rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" // ✨ FOCO VISÍVEL
            aria-label="Criar nova tarefa"
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
