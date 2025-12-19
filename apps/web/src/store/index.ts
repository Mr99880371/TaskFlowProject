import { configureStore } from '@reduxjs/toolkit'
import { tasksListener } from './tasks/tasks.listener'
import tasksReducer from './tasks/tasks.slice'
import filtersReducer from './filters/filters.slice'

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    filters: filtersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(tasksListener.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
