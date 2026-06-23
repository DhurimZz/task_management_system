import { useContext } from 'react';

import { TasksContext, TasksContextValue } from './TasksProvider';

export function useTasks(): TasksContextValue {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
}
