import { FlatList, Pressable, StyleSheet } from "react-native";
import { Text, useThemeColor, View } from "@/components/Themed";
import { useState } from "react";
import type { Task } from "@repo/shared";
import { Link } from "expo-router";

export default function TasksScreen() {
  const borderColor = useThemeColor({}, "borderColor");
  // const [tasks, setTasks] = useState<Task[]>([]);
  const tasks = [
    {
      id: "1",
      title: "Buy groceries",
      description: "Milk, eggs, bread",
      completed: false,
      createdAt: Date.now() - 1000 * 60 * 60 * 24,
      updatedAt: Date.now() - 1000 * 60 * 60 * 24,
    },
    {
      id: "2",
      title: "Finish ITX cheat sheet",
      description: null,
      completed: true,
      createdAt: Date.now() - 1000 * 60 * 60 * 8,
      updatedAt: Date.now() - 1000 * 60 * 60 * 2,
    },
    {
      id: "3",
      title: "Water polo training",
      description: "Remember cap and towel",
      completed: false,
      createdAt: Date.now() - 1000 * 60 * 30,
      updatedAt: Date.now() - 1000 * 60 * 30,
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(t) => t.id}
        contentContainerStyle={
          tasks.length === 0 ? styles.emptyWrap : undefined
        }
        ListEmptyComponent={<Text style={styles.empty}>No tasks yet.</Text>}
        renderItem={({ item }) => (
          <View style={[styles.row, { borderColor }]}>
            <Pressable style={styles.check}>
              <Text style={styles.checkText}>{item.completed ? "☑" : "☐"}</Text>
            </Pressable>
            <Link href={`/(tabs)/tasks/${item.id}`} asChild>
              <Pressable style={{ flex: 1 }}>
                <View style={styles.main}>
                  <Text
                    style={[styles.title, item.completed && styles.titleDone]}
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                  {item.description ? (
                    <Text style={styles.desc} numberOfLines={1}>
                      {item.description}
                    </Text>
                  ) : null}
                </View>
              </Pressable>
            </Link>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 24 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  emptyWrap: { flexGrow: 1, alignItems: "center", justifyContent: "center" },
  empty: { opacity: 0.7 },
  check: { width: 36, alignItems: "center" },
  checkText: { fontSize: 20 },
  main: { flex: 1, paddingRight: 8 },
  title: { fontSize: 16, fontWeight: "600" },
  titleDone: { textDecorationLine: "line-through", opacity: 0.6 },
  desc: { marginTop: 2, opacity: 0.7 },
});
