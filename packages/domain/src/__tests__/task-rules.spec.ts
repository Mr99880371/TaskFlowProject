import {
  resolveTaskStatus,
  completeTask,
  canMoveTask,
} from '../task/task.rules';

import type { Task } from '@taskflow/types';
import type { TaskWithComputedFields } from '../task/task.types';

describe('Task domain rules', () => {
  describe('resolveTaskStatus', () => {
    it('should compute delayDays when dueDate is in the past', () => {
      const task: Task = {
        id: '1',
        title: 'Delayed task',
        description: 'Test',
        status: 'TODO',
        responsible: {
          name: 'Maria',
          email: 'maria@email.com',
        },
        createdAt: new Date().toISOString(),
        dueDate: new Date(Date.now() - 86400000).toISOString(),
      };

      const result: TaskWithComputedFields = resolveTaskStatus(task);

      expect(result.status).toBe('TODO');
      expect(result.delayDays).toBeGreaterThan(0);
    });

    it('should NOT compute delayDays if dueDate is in the future', () => {
      const task: Task = {
        id: '2',
        title: 'On time task',
        description: 'Test',
        status: 'TODO',
        responsible: {
          name: 'Maria',
          email: 'maria@email.com',
        },
        createdAt: new Date().toISOString(),
        dueDate: new Date(Date.now() + 86400000).toISOString(),
      };

      const result: TaskWithComputedFields = resolveTaskStatus(task);

      expect(result.status).toBe('TODO');
      expect(result.delayDays).toBe(0);
    });

    it('should keep DONE task as DONE and not compute delay', () => {
      const task: Task = {
        id: '3',
        title: 'Done task',
        description: 'Test',
        status: 'DONE',
        responsible: {
          name: 'Maria',
          email: 'maria@email.com',
        },
        createdAt: new Date().toISOString(),
        dueDate: new Date(Date.now() - 86400000).toISOString(),
        completedAt: new Date().toISOString(),
      };

      const result: TaskWithComputedFields = resolveTaskStatus(task);

      expect(result.status).toBe('DONE');
      expect(result.delayDays).toBe(0);
    });
  });

  describe('completeTask', () => {
    it('should mark task as DONE and set completedAt', () => {
      const task: Task = {
        id: '4',
        title: 'Finish task',
        description: 'Test',
        status: 'IN_PROGRESS',
        responsible: {
          name: 'Maria',
          email: 'maria@email.com',
        },
        createdAt: new Date().toISOString(),
        dueDate: new Date().toISOString(),
      };

      const result: TaskWithComputedFields = completeTask(task);

      expect(result.status).toBe('DONE');
      expect(result.completedAt).toBeDefined();
      expect(result.delayDays).toBe(0);
    });

    it('should not change status if already DONE', () => {
      const task: Task = {
        id: '5',
        title: 'Done task',
        description: 'Test',
        status: 'DONE',
        responsible: {
          name: 'Maria',
          email: 'maria@email.com',
        },
        createdAt: new Date().toISOString(),
        dueDate: new Date().toISOString(),
        completedAt: new Date().toISOString(),
      };

      const result: TaskWithComputedFields = completeTask(task);

      expect(result.status).toBe('DONE');
    });
  });

  describe('canMoveTask', () => {
    it('should not allow moving a DONE task', () => {
      const result = canMoveTask('DONE', 'TODO');
      expect(result).toBe(false);
    });

    it('should allow moving non-DONE tasks', () => {
      const result = canMoveTask('TODO', 'IN_PROGRESS');
      expect(result).toBe(true);
    });
  });
});
