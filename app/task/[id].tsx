import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { EmptyState } from '../../src/components/EmptyState';
import { Button } from '../../src/components/ui/Button';
import { Screen } from '../../src/components/ui/Screen';
import { useTasks } from '../../src/features/tasks/useTasks';
import { colors } from '../../src/theme/colors';
import { fontSize, fontWeight, radius, spacing } from '../../src/theme/tokens';
import { formatDateTime } from '../../src/utils/date';

export default function TaskDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getTaskById, toggleTask, removeTask } = useTasks();
  const task = getTaskById(id);

  if (!task) {
    return (
      <Screen>
        <EmptyState
          title="Task not found"
          message="This task may have been deleted."
        />
      </Screen>
    );
  }

  const completed = task.status === 'completed';

  const confirmDelete = () => {
    Alert.alert('Delete task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          removeTask(task.id);
          router.back();
        },
      },
    ]);
  };

  return (
    <Screen>
      <View style={styles.body}>
        <View style={[styles.badge, completed ? styles.badgeDone : styles.badgePending]}>
          <Text style={[styles.badgeText, completed && styles.badgeTextDone]}>
            {completed ? 'Completed' : 'Pending'}
          </Text>
        </View>
        <Text style={styles.title}>{task.title}</Text>
        {task.description ? (
          <Text style={styles.description}>{task.description}</Text>
        ) : (
          <Text style={styles.descriptionMuted}>No description</Text>
        )}
        <Text style={styles.meta}>
          Created {formatDateTime(task.createdAt)}
        </Text>
      </View>
      <View style={styles.actions}>
        <Button
          label={completed ? 'Mark as Pending' : 'Mark as Completed'}
          variant="secondary"
          onPress={() => toggleTask(task.id)}
        />
        <Button label="Delete Task" variant="danger" onPress={confirmDelete} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    gap: spacing.md,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
  badgePending: {
    backgroundColor: colors.border,
  },
  badgeDone: {
    backgroundColor: colors.success,
  },
  badgeText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  badgeTextDone: {
    color: colors.primaryText,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  description: {
    fontSize: fontSize.md,
    color: colors.text,
    lineHeight: 22,
  },
  descriptionMuted: {
    fontSize: fontSize.md,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
  meta: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
  actions: {
    gap: spacing.md,
  },
});
