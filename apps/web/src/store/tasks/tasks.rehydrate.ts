import { resolveTaskStatus } from '@taskflow/domain'
import { TaskWithComputedFields } from '@taskflow/domain'

const WIP_LIMIT = 3
const WIP_COLUMNS = ['TODO', 'IN_PROGRESS', 'DELAYED', 'DONE']

export function rehydrateTasks(
  tasks: Record<string, TaskWithComputedFields>
) {
  const updated: Record<string, TaskWithComputedFields> = {}
  
  const taskCountByStatus: Record<string, number> = {}

  for (const id in tasks) {
    const status = tasks[id].status
    taskCountByStatus[status] = (taskCountByStatus[status] || 0) + 1
  }

  for (const id in tasks) {
    const task = tasks[id]
    const status = task.status

    if (WIP_COLUMNS.includes(status) && taskCountByStatus[status] > WIP_LIMIT) {
      updated[id] = resolveTaskStatus({
        ...task,
        status: 'TODO',
        completedAt: undefined,
      })
      taskCountByStatus[status]--
      taskCountByStatus['TODO'] = (taskCountByStatus['TODO'] || 0) + 1
    } else {
      updated[id] = resolveTaskStatus(task)
    }
  }

  return updated
}
