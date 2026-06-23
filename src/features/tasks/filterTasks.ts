import { TaskFilter } from '../../components/StatusFilter';
import { Task } from '../../types/task';

export function filterTasks(
  tasks: Task[],
  filter: TaskFilter,
  query: string,
): Task[] {
  const normalizedQuery = query.trim().toLowerCase();
  return tasks.filter((task) => {
    const matchesStatus = filter === 'all' || task.status === filter;
    const matchesQuery =
      normalizedQuery.length === 0 ||
      task.title.toLowerCase().includes(normalizedQuery);
    return matchesStatus && matchesQuery;
  });
}
