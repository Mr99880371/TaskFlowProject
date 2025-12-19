import { RootState } from '..'
import { TaskStatus } from '@taskflow/types'

export const selectAllTasks = (state: RootState) =>
  state.tasks.allIds.map(id => state.tasks.byId[id])

export const selectTasksByStatus =
  (status: TaskStatus) => (state: RootState) =>
    selectAllTasks(state).filter(task => task.status === status)
