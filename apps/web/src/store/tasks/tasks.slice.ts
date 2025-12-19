import { loadTasks } from './tasks.storage'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { resolveTaskStatus } from '@taskflow/domain'
import { TaskStatus } from '@taskflow/types'
import { TasksState } from './tasks.types'
import { rehydrateTasks } from './tasks.rehydrate'


const persistedState = loadTasks()

const initialState: TasksState = persistedState
  ? {
      ...persistedState,
      byId: rehydrateTasks(persistedState.byId),
    }
  : {
      byId: {},
      allIds: [],
    }

type MoveTaskPayload = {
  id: string
  to: TaskStatus
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action) {
      const computed = resolveTaskStatus(action.payload.task)
      state.byId[computed.id] = computed
      state.allIds.push(computed.id)
    },

    moveTask(state, action: PayloadAction<MoveTaskPayload>) {
      const task = state.byId[action.payload.id]
      if (!task || task.status === 'DONE') return

      const updated = resolveTaskStatus({
        ...task,
        status: action.payload.to,
        completedAt: action.payload.to === 'DONE' ? new Date().toISOString() : task.completedAt,
      })

      state.byId[task.id] = updated
    },

    updateTask(
      state,
      action: PayloadAction<{
        id: string
        title?: string
        description?: string
        dueDate?: string
        responsible?: { name: string; email: string }
      }>
    ) {
      const task = state.byId[action.payload.id]
      if (!task || task.status === 'DONE') return

      const updated = resolveTaskStatus({
        ...task,
        ...action.payload,
      })

      state.byId[task.id] = updated
    },

    deleteTask(state, action: PayloadAction<{ id: string }>) {
      delete state.byId[action.payload.id]
      state.allIds = state.allIds.filter(id => id !== action.payload.id)
    },

    completeTaskById(state, action: PayloadAction<{ id: string }>) {
      const task = state.byId[action.payload.id]
      if (!task) return

      const completed = resolveTaskStatus({
        ...task,
        status: 'DONE',
        completedAt: new Date().toISOString(),
      })

      state.byId[task.id] = completed
    },
  },
})

export const {
  addTask,
  moveTask,
  updateTask,
  deleteTask,
  completeTaskById,
} = tasksSlice.actions

export default tasksSlice.reducer
