import { Stack } from "expo-router";

export default function TasksLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="[id]"
        options={{ presentation: "modal", title: "Task" }}
      />
      <Stack.Screen
        name="create"
        options={{ presentation: "modal", title: "New task" }}
      />
      <Stack.Screen
        name="(edit)/[id]"
        options={{ presentation: "modal", title: "Edit task" }}
      />
    </Stack>
  );
}
