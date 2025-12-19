export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DELAYED' | 'DONE';

export type Responsible = {
  name: string;
  email: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  responsible: Responsible;
  createdAt: string;
  dueDate?: string;
  completedAt?: string;
};
