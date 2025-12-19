import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import type { TaskWithComputedFields } from '@taskflow/domain'
import { Pencil, X } from 'lucide-react'

type TaskCardProps = {
  task: TaskWithComputedFields
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskCard({
  task,
  onEdit,
  onDelete,
}: TaskCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    isDragging,
  } = useDraggable({ id: task.id })

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  }

  function formatDueDate(date?: string) {
  if (!date) return null

  const d = new Date(date)
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
  })
}

  const isDone = task.status === 'DONE'
  const wasLate = task.wasDelayed === true

  const showDaysLeft =
    !isDone && typeof task.daysLeft === 'number' && task.daysLeft > 0

  const showDelayed =
    !isDone && typeof task.delayDays === 'number' && task.delayDays > 0

  const showDoneInTime = isDone && !wasLate
  const showDoneLate = isDone && wasLate

  const cardBorder = isDone
  ? 'border border-green-500'
  : 'border border-transparent'


  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        cursor-grab
        rounded-xl
        bg-white
        p-4
        shadow-[0_4px_12px_rgba(0,0,0,0.08)]
        transition
        hover:shadow-[0_6px_18px_rgba(0,0,0,0.12)]
        ${cardBorder}
      `}
    >
      {/* Header */}
      <div {...attributes} {...listeners} className="flex items-start justify-between">
        <h3 className="text-sm font-semibold text-zinc-900 whitespace-pre-line">
          {task.title}
        </h3>

        <div className="flex gap-2">
          <button
            onClick={() =>{console.log('edit', task.id); onEdit(task.id)}}
            className="text-zinc-400 hover:text-zinc-600 disabled:opacity-30"
          >
            <Pencil size={14} />
          </button>

          <button
            onClick={() => {console.log('delete', task.id); onDelete(task.id)}}
            className="text-zinc-400 hover:text-red-500 disabled:opacity-30"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="mt-2 text-sm text-zinc-600">
          {task.description}
        </p>
      )}

      {/* Dates */}
      {task.dueDate && (
        <div className="mt-3 text-xs space-x-2 text-zinc-500">
          Data limite:{' '}
          <strong className="text-zinc-700">
            {formatDueDate(task.dueDate)}
          </strong>

          {showDaysLeft && (
              <span className="ml-2 font-medium text-green-600">
                {task.daysLeft === 1 ? 'Falta 1 dia' : `Faltam ${task.daysLeft} dias`}
              </span>
            )}

          {showDelayed && (
              <span className="ml-2 font-medium text-red-500">
                {task.delayDays} dias em atraso
              </span>
            )}

          {showDoneLate && (
            <span className="ml-2 font-medium text-red-500">
              Atrasada
            </span>
          )}

          {showDoneInTime && (
            <span className="ml-2 font-medium text-green-600">
              Dentro do prazo
            </span>
          )}
        </div>
      )}

      {/* Responsible */}
      <div className="mt-4 flex gap-2">
        <div className="group relative">
          <span className="cursor-default rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white">
            {task.responsible.name}
          </span>

      {/* Tooltip */}
      <div
        className="pointer-events-none absolute left-14 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-3 py-1 text-xs text-white opacity-0 shadow transition group-hover:opacity-100"
      >
        {task.responsible.email}
      </div>
    </div>
  </div>


      {/* Footer */}
      <div className="mt-3 text-[11px] text-zinc-400">
        Criado em{' '}
        {new Date(task.createdAt).toLocaleDateString()}
      </div>
    </div>
  )
}
