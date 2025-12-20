import { RootState } from '@/store'
import { selectAllTasks } from '@/store/tasks/task.selectors'

export const selectVisibleTasks = (state: RootState) => {
  const tasks = selectAllTasks(state)
  const { status, search } = state.filters

  let result = tasks

  if (status.length > 0) {
    result = result.filter(task => status.includes(task.status))
  }

  const responsibleName = state.filters.responsibleName ?? ''

    if (responsibleName.trim()) {
    const query = responsibleName.toLowerCase()

    result = result.filter(task =>
        task.responsible.name
        .toLowerCase()
        .includes(query)
    )
    }

  if (search.trim()) {
    const q = search.toLowerCase()

    result = result.filter(task =>
      `${task.title} ${task.description ?? ''}`
        .toLowerCase()
        .includes(q)
    )
  }

  return result
}
