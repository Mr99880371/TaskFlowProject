import { TasksState } from './tasks.types'

const STORAGE_KEY = '@taskflow:tasks'

export function loadTasks(): TasksState | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function saveTasks(state: TasksState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}
