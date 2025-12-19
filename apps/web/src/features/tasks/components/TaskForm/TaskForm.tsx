import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  addTask,
  updateTask,
  deleteTask,
} from '@/store/tasks/tasks.slice'
import { TaskStatus } from '@taskflow/types'

type TaskFormProps = {
  taskId?: string
  onClose: () => void
}

export function TaskForm({ taskId, onClose }: TaskFormProps) {
  const dispatch = useAppDispatch()
  const task = useAppSelector(state =>
    taskId ? state.tasks.byId[taskId] : null
  )

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [responsible, setResponsible] = useState({
    name: '',
    email: '',
  })

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDescription(task.description ?? '')
      setDueDate(task.dueDate?.slice(0, 10) ?? '')
      setResponsible(task.responsible)
    }
  }, [task])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (taskId) {
      dispatch(
        updateTask({
          id: taskId,
          title,
          description,
          dueDate: dueDate || undefined,
          responsible,
        })
      )
    } else {
      dispatch(
        addTask({
          task: {
            id: crypto.randomUUID(),
            title,
            description,
            status: 'TODO' as TaskStatus,
            createdAt: new Date().toISOString(),
            dueDate: dueDate || undefined,
            responsible,
          },
        })
      )
    }

    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md rounded-xl bg-zinc-900 p-6 shadow-xl">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-base font-medium text-zinc-100">
            {taskId ? 'Editar tarefa' : 'Nova tarefa'}
          </h2>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-200"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Título da tarefa"
            required
            className="rounded-lg bg-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Descrição (opcional)"
            className="min-h-[90px] rounded-lg bg-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <input
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            className="rounded-lg bg-zinc-800 px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          {/* Responsible */}
          <div className="flex gap-3">
            <input
              placeholder="Nome do responsável"
              value={responsible.name}
              onChange={e =>
                setResponsible({
                  ...responsible,
                  name: e.target.value,
                })
              }
              className="flex-1 rounded-lg bg-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <input
              placeholder="Email"
              value={responsible.email}
              onChange={e =>
                setResponsible({
                  ...responsible,
                  email: e.target.value,
                })
              }
              className="flex-1 rounded-lg bg-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between">
            {taskId && (
              <button
                type="button"
                onClick={() => {
                  dispatch(deleteTask({ id: taskId }))
                  onClose()
                }}
                className="text-sm font-medium text-red-500 hover:text-red-400"
              >
                Excluir tarefa
              </button>
            )}

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-500"
            >
              {taskId ? 'Salvar alterações' : 'Criar tarefa'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
