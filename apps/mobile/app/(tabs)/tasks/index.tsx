import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import { Text, useThemeColor, View } from "@/components/Themed";
import { useCallback, useEffect, useState } from "react";
// import type { Task } from "@repo/shared";
import { Link, useRouter } from "expo-router";
import { TaskDto } from "@repo/shared";
import { getTasks } from "@/src/api/tasks";
import { useFocusEffect } from "@react-navigation/native";

export default function TasksScreen() {
  const router = useRouter();
  const borderColor = useThemeColor({}, "borderColor");
  const textColor = useThemeColor({}, "text");
  const bgColor = useThemeColor({}, "background");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<TaskDto[]>([]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const tasksData = await getTasks();
      setTasks(tasksData);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      (async () => {
        await load();
        if (cancelled) return;
      })();
      return () => {
        cancelled = true;
      };
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.card}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Error</Text>
        <Text style={styles.error}>{error}</Text>
        <Pressable
          onPress={load}
          style={({ pressed }) => [
            styles.button,
            { borderColor, backgroundColor: textColor },
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={[styles.buttonText, { color: bgColor }]}>Retry</Text>
        </Pressable>
      </View>
    );
  }

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
  card: { flex: 1, alignItems: "center", justifyContent: "center" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  emptyWrap: { flexGrow: 1, alignItems: "center", justifyContent: "center" },
  empty: { fontSize: 16, opacity: 0.7 },
  check: { width: 36, alignItems: "center" },
  checkText: { fontSize: 20 },
  main: { flex: 1, paddingRight: 8 },
  title: { fontSize: 16, fontWeight: "600" },
  titleDone: { textDecorationLine: "line-through", opacity: 0.6 },
  desc: { marginTop: 2, opacity: 0.7 },
  button: {
    borderRadius: 2,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 30,
    alignItems: "center",
    borderWidth: 1,
    width: "80%",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  buttonPressed: { opacity: 0.7 },
  error: { color: "#b00020", fontSize: 16 },
});
