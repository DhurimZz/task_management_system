import { Task, TodoDto } from '../../types/task';
import { nowIso } from '../../utils/date';
import { generateId } from '../../utils/id';

export function mapTodoToTask(dto: TodoDto): Task {
  return {
    id: generateId(),
    title: dto.todo,
    description: '',
    status: dto.completed ? 'completed' : 'pending',
    createdAt: nowIso(),
  };
}
