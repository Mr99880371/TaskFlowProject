import { resolveTaskStatus } from '@taskflow/domain'
import { TaskWithComputedFields } from '@taskflow/domain'

export function rehydrateTasks(
  tasks: Record<string, TaskWithComputedFields>
) {
  const updated: Record<string, TaskWithComputedFields> = {}

  for (const id in tasks) {
    updated[id] = resolveTaskStatus(tasks[id])
  }

  return updated
}
