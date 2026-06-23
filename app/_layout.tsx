import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { TasksProvider } from '../src/features/tasks/TasksProvider';
import { colors } from '../src/theme/colors';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <TasksProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: colors.surface },
            headerTitleStyle: { color: colors.text },
            headerTintColor: colors.primary,
            contentStyle: { backgroundColor: colors.background },
          }}
        >
          <Stack.Screen name="index" options={{ title: 'My Tasks' }} />
          <Stack.Screen
            name="task/new"
            options={{ title: 'New Task', presentation: 'modal' }}
          />
          <Stack.Screen name="task/[id]" options={{ title: 'Task Details' }} />
        </Stack>
      </TasksProvider>
    </SafeAreaProvider>
  );
}
