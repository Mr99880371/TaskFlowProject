import { createListenerMiddleware } from '@reduxjs/toolkit'
import { saveTasks } from './tasks.storage'
import { addTask, moveTask, completeTaskById } from './tasks.slice'
import type { RootState } from '@/store'

export const tasksListener = createListenerMiddleware()

tasksListener.startListening({
  matcher: action =>
    addTask.match(action) ||
    moveTask.match(action) ||
    completeTaskById.match(action),
  effect: (_, api) => {
    saveTasks((api.getState() as RootState).tasks)
  },
})
