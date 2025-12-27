import React from "react";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { Ionicons } from "@expo/vector-icons";
import { getToken } from "@/src/utils/token";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].text,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen
        name="tasks"
        options={{
          title: "Task list",
          tabBarLabel: "Tasks",
          tabBarIcon: ({ color }) => (
            <Ionicons name="list-outline" size={28} color={color} />
          ),
          headerRight: () => {
            const token = getToken();
            if (!token) {
              return null;
            }
            return (
              <Link href="/(tabs)/tasks/create" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <Ionicons
                      name="add-outline"
                      size={28}
                      color={Colors[colorScheme ?? "light"].text}
                      style={{ marginRight: 20, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            );
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
