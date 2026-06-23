export type TaskStatus = 'pending' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
}

export interface TodoDto {
  id: number;
  todo: string;
  completed: boolean;
}
