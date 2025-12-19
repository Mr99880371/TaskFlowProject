import reducer, { addTask, moveTask } from '../tasks.slice'
import { Task } from '@taskflow/types'

describe('tasks slice', () => {
  it('adds a task with computed fields', () => {
    const task: Task = {
      id: '1',
      title: 'Test task',
      description: 'desc',
      status: 'TODO',
      responsible: { name: 'Alice', email: 'alice@example.com' },
      createdAt: new Date('2024-01-01').toISOString(),
      dueDate: new Date('2024-01-02').toISOString(),
    }

    const state = reducer(undefined, addTask(task))

    expect(state.allIds).toHaveLength(1)
    expect(state.byId['1'].status === 'DELAYED' || state.byId['1'].delayDays === 0).toBe(true)
  })

  it('moves task when domain allows transition', () => {
    const task: Task = {
      id: '1',
      title: 'Task',
      description: 'desc',
      status: 'TODO',
      responsible: { name: 'Alice', email: 'alice@example.com' },
      createdAt: new Date().toISOString(),
      dueDate: new Date().toISOString(),
    }

    let state = reducer(undefined, addTask(task))
    state = reducer(state, moveTask({ id: '1', to: 'IN_PROGRESS' }))

    expect(state.byId['1'].status).toBe('IN_PROGRESS')
  })

  it('does not move task when domain blocks transition', () => {
    const task: Task = {
      id: '1',
      title: 'Task',
      description: 'desc',
      status: 'DONE',
      responsible: { name: 'Alice', email: 'alice@example.com' },
      createdAt: new Date().toISOString(),
      dueDate: new Date().toISOString(),
    }

    let state = reducer(undefined, addTask(task))
    state = reducer(state, moveTask({ id: '1', to: 'TODO' }))

    expect(state.byId['1'].status).toBe('DONE')
  })
})
