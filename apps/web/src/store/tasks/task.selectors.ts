import { RootState } from '@/store'
import { TaskStatus } from '@taskflow/types'
import { createSelector } from '@reduxjs/toolkit'

export const selectAllTasks = (state: RootState) =>
  state.tasks.allIds.map(id => state.tasks.byId[id])

export const selectTasksByStatus =
  (status: TaskStatus) => (state: RootState) =>
    selectAllTasks(state).filter(task => task.status === status)

export const selectTotalTasks = (state: RootState) =>
  state.tasks.allIds.length

export const selectCompletedTodayPercentage = createSelector(
  [selectAllTasks],
  tasks => {
    const today = new Date().toISOString().slice(0, 10)

    const completedToday = tasks.filter(
      task => task.completedAt && task.completedAt.startsWith(today)
    )

    return tasks.length
      ? Math.round((completedToday.length / tasks.length) * 100)
      : 0
  }
)

export const selectAverageCompletionTime = createSelector(
  [selectAllTasks],
  tasks => {
    const completed = tasks.filter(
      task => task.completedAt && task.createdAt
    )

    if (!completed.length) return 0

    const totalMs = completed.reduce((acc, task) => {
      return (
        acc +
        (new Date(task.completedAt!).getTime() -
          new Date(task.createdAt).getTime())
      )
    }, 0)

    return Math.round(totalMs / completed.length / 1000 / 60)
  }
)