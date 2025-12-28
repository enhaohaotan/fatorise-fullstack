import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import { Text, useThemeColor, View } from "@/components/Themed";
import { useEffect, useMemo, useState } from "react";
import {
  CreateTaskBody,
  CreateTaskBodySchema,
  TaskDto,
  UpdateTaskBody,
  UpdateTaskBodySchema,
} from "@repo/shared";
import * as z from "zod";
import { useLocalSearchParams, useRouter } from "expo-router";
import { createTask, getTask, updateTask } from "@/src/api/tasks";

export default function TaskInfoScreen() {
  const router = useRouter();
  const borderColor = useThemeColor({}, "borderColor");
  const textColor = useThemeColor({}, "text");
  const bgColor = useThemeColor({}, "background");

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof CreateTaskBody, string>>
  >({});

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const canSubmit = useMemo(() => {
    return title.trim().length > 0 && !submitting;
  }, [title, submitting]);

  async function handleCreate() {
    setFormError(null);
    setFieldErrors({});

    const input: CreateTaskBody = {
      title,
      description,
    };

    const parsed = CreateTaskBodySchema.safeParse(input);
    if (!parsed.success) {
      const { formErrors, fieldErrors } = z.flattenError(parsed.error);
      setFormError(formErrors[0] ?? "Please check the highlighted fields.");
      setFieldErrors({
        title: fieldErrors.title?.[0],
        description: fieldErrors.description?.[0],
      });
      return;
    }
    try {
      setSubmitting(true);
      await createTask(parsed.data);
      router.replace("/(tabs)/tasks");
    } catch (error: any) {
      setFormError(error?.message ?? "Create failed. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: bgColor }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Create task</Text>
        {formError ? <Text style={styles.formError}>{formError}</Text> : null}
        <View style={styles.field}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            value={title}
            onChangeText={(text) => setTitle(text)}
            placeholder="task title"
            placeholderTextColor={textColor + "80"}
            style={[
              styles.input,
              { borderColor, color: textColor },
              fieldErrors.title ? styles.inputError : null,
            ]}
          />
          {fieldErrors.title ? (
            <Text style={styles.fieldError}>{fieldErrors.title}</Text>
          ) : null}
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            value={description}
            onChangeText={(text) => setDescription(text)}
            placeholder="task description"
            multiline
            numberOfLines={4}
            placeholderTextColor={textColor + "80"}
            style={[
              styles.input,
              styles.textarea,
              { borderColor, color: textColor },
              fieldErrors.description ? styles.inputError : null,
            ]}
          />
          {fieldErrors.description ? (
            <Text style={styles.fieldError}>{fieldErrors.description}</Text>
          ) : null}
        </View>
        <Pressable
          onPress={handleCreate}
          style={({ pressed }) => [
            styles.button,
            { borderColor, backgroundColor: textColor },
            (!canSubmit || submitting) && styles.buttonDisabled,
            pressed && styles.buttonPressed,
          ]}
        >
          {submitting ? (
            <ActivityIndicator />
          ) : (
            <Text style={[styles.buttonText, { color: bgColor }]}>Save</Text>
          )}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    marginTop: 50,
    width: "80%",
    alignSelf: "center",
  },
  formError: { marginTop: 12, color: "#b00020" },
  label: { marginBottom: 6, fontSize: 14, opacity: 0.85 },
  input: {
    borderWidth: 1,
    borderRadius: 2,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  inputError: {
    borderColor: "#b00020",
  },
  field: {
    marginTop: 14,
  },
  fieldError: { marginTop: 6, color: "#b00020" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    borderRadius: 2,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 30,
    alignItems: "center",
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  buttonPressed: { opacity: 0.7 },
  buttonDisabled: { opacity: 0.5 },
  textarea: {
    textAlignVertical: "top",
    minHeight: 100,
  },
  error: { color: "#b00020", fontSize: 16 },
});
