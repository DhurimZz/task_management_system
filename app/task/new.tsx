import { useHeaderHeight } from '@react-navigation/elements';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { Button } from '../../src/components/ui/Button';
import { Screen } from '../../src/components/ui/Screen';
import { TextField } from '../../src/components/ui/TextField';
import { useTasks } from '../../src/features/tasks/useTasks';
import { spacing } from '../../src/theme/tokens';
import {
  DESCRIPTION_MAX_LENGTH,
  TITLE_MAX_LENGTH,
  validateTaskInput,
} from '../../src/utils/validation';

export default function NewTaskScreen() {
  const router = useRouter();
  const headerHeight = useHeaderHeight();
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ title?: string; description?: string }>(
    {},
  );

  const handleSave = () => {
    const result = validateTaskInput({ title, description });
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }
    addTask({ title, description });
    router.back();
  };

  return (
    <Screen padded={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={headerHeight}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
        >
          <View style={styles.form}>
            <TextField
              label="Title"
              value={title}
              onChangeText={setTitle}
              placeholder="What needs to be done?"
              maxLength={TITLE_MAX_LENGTH}
              error={errors.title}
              returnKeyType="next"
            />
            <TextField
              label="Description"
              value={description}
              onChangeText={setDescription}
              placeholder="Add more detail (optional)"
              maxLength={DESCRIPTION_MAX_LENGTH}
              error={errors.description}
              multiline
              numberOfLines={4}
              style={styles.multiline}
            />
          </View>
          <Button label="Save Task" onPress={handleSave} />
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    gap: spacing.lg,
  },
  form: {
    gap: spacing.lg,
  },
  multiline: {
    minHeight: 96,
    textAlignVertical: 'top',
  },
});
