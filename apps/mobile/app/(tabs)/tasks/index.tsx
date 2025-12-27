import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import { Text, useThemeColor, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import { TaskDto, UpdateTaskBody, UpdateTaskBodySchema } from "@repo/shared";
import { deleteTask, getTasks, updateTask } from "@/src/api/tasks";
import { onAuthEvent } from "@/src/utils/authEvents";
import * as z from "zod";
import { Ionicons } from "@expo/vector-icons";

export default function TasksScreen() {
  const borderColor = useThemeColor({}, "borderColor");
  const textColor = useThemeColor({}, "text");
  const bgColor = useThemeColor({}, "background");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  async function onToggleTaskCompleted(task: TaskDto) {
    const input: UpdateTaskBody = {
      completed: !task.completed,
    };
    const parsed = UpdateTaskBodySchema.safeParse(input);
    if (!parsed.success) {
      const { formErrors } = z.flattenError(parsed.error);
      setError(formErrors[0] ?? "Please check the highlighted fields.");
      return;
    }
    try {
      const updated = await updateTask(parsed.data, task.id);
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (error: any) {
      setError(error?.message ?? "Complete failed. Please try again later.");
    }
  }

  async function onDeleteTask(task: TaskDto) {
    try {
      await deleteTask(task.id);
      setTasks((prev) => prev.filter((t) => t.id !== task.id));
    } catch (error: any) {
      setError(error?.message ?? "Delete failed. Please try again later.");
    }
  }

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

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    const off = onAuthEvent(async () => {
      await load();
    });
    return off;
  }, []);

  async function onRefresh() {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }

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
        refreshing={refreshing}
        onRefresh={onRefresh}
        contentContainerStyle={
          tasks.length === 0 ? styles.emptyWrap : undefined
        }
        ListEmptyComponent={<Text style={styles.empty}>No tasks yet.</Text>}
        renderItem={({ item }) => (
          <View style={[styles.row, { borderColor }]}>
            <Pressable
              onPress={() => onToggleTaskCompleted(item)}
              style={styles.check}
            >
              {item.completed ? (
                <Ionicons
                  name="checkbox-outline"
                  size={20}
                  style={styles.checkText}
                  color={textColor}
                />
              ) : (
                <Ionicons
                  name="square-outline"
                  size={20}
                  style={styles.checkText}
                  color={textColor}
                />
              )}
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
            <Pressable onPress={() => onDeleteTask(item)} style={styles.check}>
              {({ pressed }) => (
                <Ionicons
                  name="trash-outline"
                  size={20}
                  style={[styles.checkText, { opacity: pressed ? 0.5 : 1 }]}
                  color={textColor}
                />
              )}
            </Pressable>
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
