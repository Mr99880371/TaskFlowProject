import { configureStore } from '@reduxjs/toolkit'
import { tasksListener } from './tasks/tasks.listener'
import tasksReducer from './tasks/tasks.slice'

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(tasksListener.middleware),
})
