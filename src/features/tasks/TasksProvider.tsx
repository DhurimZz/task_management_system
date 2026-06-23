import {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

import { loadTasks, saveTasks } from '../../services/storage';
import { Task } from '../../types/task';
import { nowIso } from '../../utils/date';
import { generateId } from '../../utils/id';

interface TasksState {
  tasks: Task[];
  hydrated: boolean;
}

type TasksAction =
  | { type: 'hydrate'; tasks: Task[] }
  | { type: 'add'; title: string; description: string }
  | { type: 'toggle'; id: string }
  | { type: 'remove'; id: string }
  | { type: 'import'; tasks: Task[] };

export interface TasksContextValue {
  tasks: Task[];
  hydrated: boolean;
  addTask: (input: { title: string; description: string }) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  importTasks: (tasks: Task[]) => void;
  getTaskById: (id: string) => Task | undefined;
}

const initialState: TasksState = { tasks: [], hydrated: false };

function reducer(state: TasksState, action: TasksAction): TasksState {
  switch (action.type) {
    case 'hydrate':
      return { tasks: action.tasks, hydrated: true };
    case 'add': {
      const task: Task = {
        id: generateId(),
        title: action.title.trim(),
        description: action.description.trim(),
        status: 'pending',
        createdAt: nowIso(),
      };
      return { ...state, tasks: [task, ...state.tasks] };
    }
    case 'toggle':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id
            ? {
                ...task,
                status: task.status === 'completed' ? 'pending' : 'completed',
              }
            : task,
        ),
      };
    case 'remove':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.id),
      };
    case 'import': {
      const existingIds = new Set(state.tasks.map((task) => task.id));
      const incoming = action.tasks.filter((task) => !existingIds.has(task.id));
      return { ...state, tasks: [...incoming, ...state.tasks] };
    }
    default:
      return state;
  }
}

export const TasksContext = createContext<TasksContextValue | undefined>(
  undefined,
);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let active = true;
    loadTasks().then((tasks) => {
      if (active) {
        dispatch({ type: 'hydrate', tasks });
      }
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (state.hydrated) {
      saveTasks(state.tasks);
    }
  }, [state.tasks, state.hydrated]);

  const value = useMemo<TasksContextValue>(
    () => ({
      tasks: state.tasks,
      hydrated: state.hydrated,
      addTask: (input) =>
        dispatch({
          type: 'add',
          title: input.title,
          description: input.description,
        }),
      toggleTask: (id) => dispatch({ type: 'toggle', id }),
      removeTask: (id) => dispatch({ type: 'remove', id }),
      importTasks: (tasks) => dispatch({ type: 'import', tasks }),
      getTaskById: (id) => state.tasks.find((task) => task.id === id),
    }),
    [state.tasks, state.hydrated],
  );

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}
