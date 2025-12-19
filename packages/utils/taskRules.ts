import type { Task } from '@taskflow/types';
import type { TaskStatus } from '@taskflow/types';

export function isTaskDelayed(task: Task, now = new Date()): boolean {
  if (task.status === 'DONE') return false;
  if (!task.dueDate) return false;

  const dueDate = new Date(task.dueDate);
  return dueDate < now;
}

export function getUpdatedStatus(task: Task, now = new Date()): TaskStatus {
  if (task.status === 'DONE') return 'DONE';

  return isTaskDelayed(task, now) ? 'DELAYED' : task.status;
}

export function completeTask(task: Task): Task {
  return {
    ...task,
    status: 'DONE',
    completedAt: new Date().toISOString(),
  };
}