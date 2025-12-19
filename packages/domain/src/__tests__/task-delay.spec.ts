import { resolveTaskStatus } from '../task/task.rules';
import type { Task } from '@taskflow/types';

describe('Task delay rules', () => {
  it('should compute delayDays when dueDate is in the past', () => {
    const task: Task = {
      id: '1',
      title: 'Test task',
      description: 'Test',
      status: 'TODO',
      responsible: {
        name: 'Maria',
        email: 'maria@email.com',
      },
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() - 86400000).toISOString(), // ontem
    };

    const result = resolveTaskStatus(task);

    expect(result.status).toBe('TODO');
    expect(result.delayDays).toBeGreaterThan(0);
  });
});
