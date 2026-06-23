import { FlatList, StyleSheet } from 'react-native';

import { spacing } from '../theme/tokens';
import { Task } from '../types/task';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
}

export function TaskList({ tasks, onSelect, onToggle }: TaskListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(task) => task.id}
      renderItem={({ item }) => (
        <TaskItem task={item} onPress={onSelect} onToggle={onToggle} />
      )}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    />
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
});
