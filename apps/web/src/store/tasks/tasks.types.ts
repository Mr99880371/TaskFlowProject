import { TaskWithComputedFields } from '@taskflow/domain'

export interface TasksState {
  byId: Record<string, TaskWithComputedFields>
  allIds: string[]
}
