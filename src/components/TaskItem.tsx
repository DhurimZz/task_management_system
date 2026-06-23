import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import { fontSize, fontWeight, radius, spacing } from '../theme/tokens';
import { Task } from '../types/task';
import { formatDate } from '../utils/date';

interface TaskItemProps {
  task: Task;
  onPress: (id: string) => void;
  onToggle: (id: string) => void;
}

export function TaskItem({ task, onPress, onToggle }: TaskItemProps) {
  const completed = task.status === 'completed';
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onPress(task.id)}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: completed }}
        hitSlop={8}
        onPress={() => onToggle(task.id)}
        style={[styles.checkbox, completed && styles.checkboxChecked]}
      >
        {completed ? <Text style={styles.check}>✓</Text> : null}
      </Pressable>
      <View style={styles.body}>
        <Text
          numberOfLines={1}
          style={[styles.title, completed && styles.titleCompleted]}
        >
          {task.title}
        </Text>
        {task.description ? (
          <Text numberOfLines={1} style={styles.description}>
            {task.description}
          </Text>
        ) : null}
        <Text style={styles.meta}>{formatDate(task.createdAt)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  pressed: {
    opacity: 0.85,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: radius.sm,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  check: {
    color: colors.primaryText,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
  body: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
  },
  description: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
  meta: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
});
