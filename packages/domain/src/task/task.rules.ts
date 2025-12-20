import type { Task } from '@taskflow/types'
import type { TaskWithComputedFields } from './task.types'
import {
  calculateDelayDays,
  calculateDaysLeft,
  isTaskDelayed,
} from './task.helpers'

export function resolveTaskStatus(
  task: Task & { wasDelayed?: boolean; delayDays?: number }
): TaskWithComputedFields {

  if (task.status === 'DONE') {
    return {
      ...task,
      delayDays: task.wasDelayed ? task.delayDays ?? 0 : 0,
      daysLeft: 0,
      wasDelayed: task.wasDelayed ?? false,
    }
  }

  if (task.dueDate) {
    if (isTaskDelayed(task.dueDate)) {
      return {
        ...task,
        delayDays: calculateDelayDays(task.dueDate),
        daysLeft: 0,
        wasDelayed: true,
      }
    }

    return {
      ...task,
      delayDays: 0,
      daysLeft: calculateDaysLeft(task.dueDate),
      wasDelayed: false,
    }
  }

  return {
    ...task,
    delayDays: 0,
    daysLeft: 0,
    wasDelayed: false,
  }
}

export function completeTask(task: Task): TaskWithComputedFields {
  if (task.status === 'DONE') {
    return resolveTaskStatus(task);
  }
  
  const completedTask: Task = {
    ...task,
    status: 'DONE',
    completedAt: new Date().toISOString(),
  };
  
  return resolveTaskStatus(completedTask);
}

export function canMoveTask(
    currentStatus: Task['status'],
    targetStatus: Task['status']
  ): boolean {
    if (currentStatus === 'DONE') {
      return false;
    }
  
    return true;
}

