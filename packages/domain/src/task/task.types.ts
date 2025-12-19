import type { Task } from '@taskflow/types';

export type TaskWithComputedFields = Task & {
  delayDays?: number;
  daysLeft?: number;
  wasDelayed?: boolean;
};
