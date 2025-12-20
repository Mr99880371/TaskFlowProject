export function calculateDelayDays(dueDate: string): number {
  const due = new Date(dueDate).setHours(0, 0, 0, 0);
  const today = new Date().setHours(0, 0, 0, 0);

  const diff = today - due;
  return diff > 0 ? Math.floor(diff / 86400000) : 0;
}                   

export function isTaskDelayed(dueDate: string): boolean {
  return calculateDelayDays(dueDate) > 0;
}

export function calculateDaysLeft(dueDate: string): number {
  const due = new Date(dueDate);
  const today = new Date();

  due.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diff = due.getTime() - today.getTime();

  return diff > 0
    ? Math.ceil(diff / 86400000)
    : 0;
}

