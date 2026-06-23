import { useState } from 'react';

import { fetchSampleTodos } from '../../services/api';
import { mapTodoToTask } from './taskMappers';
import { useTasks } from './useTasks';

interface ImportState {
  importSamples: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useImportSamples(): ImportState {
  const { importTasks } = useTasks();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const importSamples = async () => {
    setLoading(true);
    setError(null);
    try {
      const todos = await fetchSampleTodos();
      importTasks(todos.map(mapTodoToTask));
    } catch {
      setError('Could not load sample tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { importSamples, loading, error };
}
