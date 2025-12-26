import { Stack } from "expo-router";

export default function TasksLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="me" options={{ headerShown: false }} />
      <Stack.Screen
        name="signin"
        options={{ presentation: "modal", title: "Sign In" }}
      />
      <Stack.Screen
        name="signup"
        options={{ presentation: "modal", title: "Sign Up" }}
      />
    </Stack>
  );
}
