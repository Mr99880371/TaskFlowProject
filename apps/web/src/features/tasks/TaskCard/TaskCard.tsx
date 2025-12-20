import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import type { TaskWithComputedFields } from '@taskflow/domain'
import { Move, Pencil, X } from 'lucide-react'
import { MoveMenu } from '@/components/MoveMenu'
import { useState } from 'react'

type TaskCardProps = {
  task: TaskWithComputedFields
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

function formatDueDate(date?: string): string | null {
  if (!date) return null

  const d = new Date(date)
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
  })
}

function formatCreatedDate(date: string): string {
  return new Date(date).toLocaleDateString('pt-BR')
}

function getDaysLeftText(daysLeft?: number): string | null {
  if (!daysLeft) return null
  return daysLeft === 1 ? 'Falta 1 dia' : `Faltam ${daysLeft} dias`
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const { setNodeRef, attributes, listeners, transform, isDragging } =
    useDraggable({ id: task.id })

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  }

  const [isMoveMenuOpen, setIsMoveMenuOpen] = useState(false)

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
      {...listeners}
      style={style}
      className={`
        cursor-grab
        rounded-xl
        bg-white
        p-4
        shadow-md hover:shadow-lg
        transition
        ${cardBorder}
      `}
    >
      <div
        {...attributes}
        className="flex items-start justify-between"
      >
        <h3 className="text-sm font-semibold text-zinc-900 whitespace-pre-line">
          {task.title}
        </h3>

        <div className="flex gap-2">

          <div className="relative">
            <button
              onClick={() => setIsMoveMenuOpen(v => !v)}
              className="text-zinc-400 hover:text-blue-500 disabled:opacity-30"
              aria-label="Mover tarefa"
            >
              <Move size={14} />
            </button>

            {isMoveMenuOpen && (
              <MoveMenu
                taskId={task.id}
                currentStatus={task.status}
                onClose={() => setIsMoveMenuOpen(false)}
              />
            )}
          </div>

          <button
            onClick={() => onEdit(task.id)}
            className="text-zinc-400 hover:text-zinc-600 disabled:opacity-30"
            aria-label="Editar tarefa"
          >
            <Pencil size={14} />
          </button>

          <button
            onClick={() => onDelete(task.id)}
            className="text-zinc-400 hover:text-red-500 disabled:opacity-30"
            aria-label="Excluir tarefa"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="mt-2 text-sm text-zinc-600">{task.description}</p>
      )}

      {task.dueDate && (
        <div className="mt-3 text-xs space-x-2 text-zinc-500">
          Data limite:{' '}
          <strong className="text-zinc-700">
            {formatDueDate(task.dueDate)}
          </strong>
          {showDaysLeft && (
            <span className="ml-2 font-medium text-green-600">
              {getDaysLeftText(task.daysLeft)}
            </span>
          )}
          {showDelayed && (
            <span className="ml-2 font-medium text-red-500">
              {task.delayDays} dias em atraso
            </span>
          )}
          {showDoneLate && (
            <span className="ml-2 font-medium text-red-500">Atrasada</span>
          )}
          {showDoneInTime && (
            <span className="ml-2 font-medium text-green-600">
              Dentro do prazo
            </span>
          )}
        </div>
      )}

      <div className="mt-4 flex gap-2">
        <div className="group relative">
          <span className="cursor-default rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white">
            {task.responsible.name}
          </span>

          <div className="pointer-events-none absolute left-14 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-3 py-1 text-xs text-white opacity-0 shadow transition group-hover:opacity-100">
            {task.responsible.email}
          </div>
        </div>
      </div>

      <div className="mt-3 text-[11px] text-zinc-400">
        Criado em {formatCreatedDate(task.createdAt)}
      </div>
    </div>
  )
}