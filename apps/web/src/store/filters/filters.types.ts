import type { TaskStatus } from '@taskflow/types'

export type SortOrder = 'asc' | 'desc'

export type FiltersState = {
  status: TaskStatus | 'ALL'
  responsibleEmail: string | null
  search: string
  sortByCreatedAt: SortOrder
}
