import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { EmptyState } from '../src/components/EmptyState';
import { SearchBar } from '../src/components/SearchBar';
import { StatusFilter, TaskFilter } from '../src/components/StatusFilter';
import { TaskList } from '../src/components/TaskList';
import { Button } from '../src/components/ui/Button';
import { Screen } from '../src/components/ui/Screen';
import { filterTasks } from '../src/features/tasks/filterTasks';
import { useImportSamples } from '../src/features/tasks/useImportSamples';
import { useTasks } from '../src/features/tasks/useTasks';
import { colors } from '../src/theme/colors';
import { fontSize, spacing } from '../src/theme/tokens';

export default function HomeScreen() {
  const router = useRouter();
  const { tasks, hydrated, toggleTask } = useTasks();
  const { importSamples, loading, error } = useImportSamples();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<TaskFilter>('all');

  const visibleTasks = useMemo(
    () => filterTasks(tasks, filter, query),
    [tasks, filter, query],
  );

  const openTask = (id: string) => router.push(`/task/${id}`);
  const openNewTask = () => router.push('/task/new');

  const hasTasks = tasks.length > 0;
  const isFiltering = query.trim().length > 0 || filter !== 'all';

  const renderContent = () => {
    if (!hydrated) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator color={colors.primary} />
        </View>
      );
    }
    if (!hasTasks) {
      return (
        <EmptyState
          title="No tasks yet"
          message="Add your first task to get started."
        />
      );
    }
    if (visibleTasks.length === 0) {
      return (
        <EmptyState
          title="No matches"
          message="No tasks match your search or filter."
        />
      );
    }
    return (
      <TaskList tasks={visibleTasks} onSelect={openTask} onToggle={toggleTask} />
    );
  };

  return (
    <Screen>
      {hasTasks || isFiltering ? (
        <View style={styles.controls}>
          <SearchBar value={query} onChangeText={setQuery} />
          <StatusFilter value={filter} onChange={setFilter} />
        </View>
      ) : null}
      <View style={styles.body}>{renderContent()}</View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={styles.actions}>
        <Button label="New Task" onPress={openNewTask} />
        <Button
          label="Import sample tasks"
          variant="secondary"
          onPress={importSamples}
          loading={loading}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  controls: {
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  body: {
    flex: 1,
    marginBottom: spacing.md,
  },
  actions: {
    gap: spacing.md,
  },
  error: {
    fontSize: fontSize.sm,
    color: colors.danger,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
