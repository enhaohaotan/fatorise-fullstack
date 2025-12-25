import { Stack } from "expo-router";

export default function TasksLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Task list index" }} />
      <Stack.Screen
        name="(modal)/create"
        options={{ presentation: "modal", title: "Create new task" }}
      />
      {/* 下面这些你需要时再打开 */}
      {/* <Stack.Screen name="create" options={{ title: "New task" }} /> */}
      {/* <Stack.Screen name="[id]" options={{ title: "Task" }} /> */}
    </Stack>
  );
}
