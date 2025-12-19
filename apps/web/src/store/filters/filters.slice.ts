import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { TaskStatus } from '@taskflow/types'

type FiltersState = {
  status: TaskStatus[]
  responsibleName: string
  search: string
  sortByCreatedAt: 'ASC' | 'DESC'
}

const initialState: FiltersState = {
  status: [],
  responsibleName: '',
  search: '',
  sortByCreatedAt: 'DESC',
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleStatusFilter(state, action: PayloadAction<TaskStatus>) {
      const status = action.payload

      if (state.status.includes(status)) {
        state.status = state.status.filter(s => s !== status)
      } else {
        state.status.push(status)
      }
    },

    setResponsibleFilter(state, action: PayloadAction<string>) {
      state.responsibleName = action.payload
    },


    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
    },

    clearFilters() {
      return initialState
    },
  },
})

export const {
  toggleStatusFilter,
  setResponsibleFilter,
  setSearch,
  clearFilters,
} = filtersSlice.actions

export default filtersSlice.reducer
