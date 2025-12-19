import { useAppSelector } from '@/store/hooks'
import {
  selectTotalTasks,
  selectCompletedTodayPercentage,
  selectAverageCompletionTime,
} from '@/store/tasks/task.selectors'

export function Dashboard() {
  const total = useAppSelector(selectTotalTasks)
  const completedToday =
    useAppSelector(selectCompletedTodayPercentage)
  const avgTime =
    useAppSelector(selectAverageCompletionTime)

  return (
    <div className="mb-8 grid grid-cols-3 gap-4">
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <p className="text-xs text-zinc-500">
          Total de tarefas
        </p>
        <p className="text-2xl font-semibold">
          {total}
        </p>
      </div>

      <div className="rounded-lg bg-white p-4 shadow-sm">
        <p className="text-xs text-zinc-500">
          Concluídas hoje
        </p>
        <p className="text-2xl font-semibold">
          {completedToday}%
        </p>
      </div>

      <div className="rounded-lg bg-white p-4 shadow-sm">
        <p className="text-xs text-zinc-500">
          Tempo médio até conclusão
        </p>
        <p className="text-2xl font-semibold">
          {avgTime} min
        </p>
      </div>
    </div>
  )
}
