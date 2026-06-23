import { TodoDto } from '../types/task';

const TODOS_URL = 'https://dummyjson.com/todos?limit=5';

interface TodosResponse {
  todos: TodoDto[];
}

export async function fetchSampleTodos(): Promise<TodoDto[]> {
  const response = await fetch(TODOS_URL);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data = (await response.json()) as TodosResponse;
  if (!Array.isArray(data.todos)) {
    throw new Error('Unexpected response shape');
  }
  return data.todos;
}
