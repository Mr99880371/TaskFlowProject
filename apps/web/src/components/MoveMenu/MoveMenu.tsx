import { useAppDispatch } from '@/store/hooks'
import { moveTask } from '@/store/tasks/tasks.slice'
import { TaskStatus } from '@taskflow/types'

type MoveMenuProps = {
  taskId: string
  currentStatus: TaskStatus
  onClose: () => void
}

const STATUS_OPTIONS: { status: TaskStatus; label: string }[] = [
  { status: 'TODO', label: 'A fazer' },
  { status: 'IN_PROGRESS', label: 'Em progresso' },
  { status: 'DELAYED', label: 'Atrasadas' },
  { status: 'DONE', label: 'Concluídas' },
]

export function MoveMenu({ taskId, currentStatus, onClose }: MoveMenuProps) {
  const dispatch = useAppDispatch()

  function handleMove(newStatus: TaskStatus) {
    dispatch(moveTask({ id: taskId, to: newStatus }))
    onClose()
  }

  return (
    <div className="absolute right-0 top-full z-20 mt-2 w-40 rounded-md bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5">
      <p className="text-xs font-semibold text-zinc-500 px-2 py-1">Mover para:</p>
      {STATUS_OPTIONS.map(option => (
        <button
          key={option.status}
          onClick={() => handleMove(option.status)}
          disabled={option.status === currentStatus}
          className="block w-full text-left px-2 py-1 text-sm text-zinc-700 hover:bg-blue-50 disabled:text-zinc-400 disabled:cursor-not-allowed rounded-md"
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
