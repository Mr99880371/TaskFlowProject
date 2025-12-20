import { useState } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { useAppDispatch } from '@/store/hooks'
import { deleteTask } from '@/store/tasks/tasks.slice'
import { TaskWithComputedFields } from '@taskflow/domain'
import { TaskCard } from '../TaskCard/TaskCard'
import { TaskForm } from '../TaskForm/TaskForm'

type Props = {
  title: string
  status: TaskWithComputedFields['status']
  tasks: TaskWithComputedFields[]
}

const COUNTER_COLORS: Record<TaskWithComputedFields['status'], string> = {
  TODO: 'bg-blue-100 text-blue-600',
  IN_PROGRESS: 'bg-blue-100 text-blue-600',
  DELAYED: 'bg-orange-100 text-orange-600',
  DONE: 'bg-green-100 text-green-600',
}


export function TaskColumn({ title, status, tasks }: Props) {
  const dispatch = useAppDispatch()
  const [editingTaskId, setEditingTaskId] = useState<string | null>(
    null
  )

  const { setNodeRef, isOver } = useDroppable({
    id: status,
  })

  return (
    <>
      <div
        ref={setNodeRef}
        className={`
          flex h-full w-full min-w-[280px] sm:w-[280px] flex-shrink-0 flex-col
          rounded-xl p-3 transition-all duration-200
          shadow-md hover:shadow-lg
          ${
            isOver
              ? 'border-2 border-blue-500 bg-blue-50' 
              : 'border border-zinc-100 bg-white'
          }
        `}
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-zinc-700">
            {title}
          </h2>

          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${COUNTER_COLORS[status]}`} aria-label={`Total de ${tasks.length} tarefas na coluna ${title}`}>
            {tasks.length}
          </span>
        </div>

        <div className="mb-3 h-px w-full bg-zinc-200" />
        
        <div className="flex flex-1 flex-col gap-3">
          {tasks.length === 0 && (
            <div className="min-h-[80px] rounded-md border border-dashed border-zinc-300" />
          )}

          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={id => setEditingTaskId(id)}
              onDelete={id =>
                dispatch(deleteTask({ id }))
              }
            />
          ))}
        </div>
      </div>

      {editingTaskId && (
        <TaskForm
          taskId={editingTaskId}
          onClose={() => setEditingTaskId(null)}
        />
      )}
    </>
  )
}
