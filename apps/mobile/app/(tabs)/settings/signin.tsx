import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import { Text, useThemeColor, View } from "@/components/Themed";
import { useMemo, useState } from "react";
import { SignInBody, SignInBodySchema } from "@repo/shared";
import * as z from "zod";
import { signIn } from "@/src/api/auth";
import { router } from "expo-router";
import { saveToken } from "@/src/utils/token";
import { emitAuthEvent } from "@/src/utils/authEvents";

export default function SignInScreen() {
  const borderColor = useThemeColor({}, "borderColor");
  const textColor = useThemeColor({}, "text");
  const bgColor = useThemeColor({}, "background");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof SignInBody, string>>
  >({});

  const canSubmit = useMemo(() => {
    return email.trim().length > 0 && password.length > 0 && !submitting;
  }, [email, password]);

  async function handleSignUp() {
    setFormError(null);
    setFieldErrors({});

    const input: SignInBody = {
      email: email.trim(),
      password,
    };

    const parsed = SignInBodySchema.safeParse(input);
    if (!parsed.success) {
      const { formErrors, fieldErrors } = z.flattenError(parsed.error);
      setFormError(formErrors[0] ?? "Please check the highlighted fields.");
      setFieldErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      return;
    }

    try {
      setSubmitting(true);
      const auth = await signIn(parsed.data);
      await saveToken(auth.token);
      emitAuthEvent();
      router.replace("/(tabs)/tasks");
    } catch (error: any) {
      setFormError(error?.message ?? "Sign in failed. Please try again later.");
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
        <Text style={styles.title}>Your Account</Text>
        {formError ? <Text style={styles.formError}>{formError}</Text> : null}
        <View style={styles.field}>
          <Text style={styles.label}>Email*</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="user@example.com"
            placeholderTextColor={textColor + "80"}
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCapitalize="none"
            autoCorrect={false}
            style={[
              styles.input,
              { borderColor, color: textColor },
              fieldErrors.email && styles.inputError,
            ]}
          />
          {fieldErrors.email ? (
            <Text style={styles.fieldError}>{fieldErrors.email}</Text>
          ) : null}
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Password*</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="••••••••"
            placeholderTextColor={textColor + "80"}
            textContentType="password"
            style={[
              styles.input,
              { borderColor, color: textColor },
              fieldErrors.password && styles.inputError,
            ]}
          />
          {fieldErrors.password ? (
            <Text style={styles.fieldError}>{fieldErrors.password}</Text>
          ) : null}
        </View>

        <Pressable
          disabled={!canSubmit}
          style={({ pressed }) => [
            styles.button,
            { borderColor, backgroundColor: textColor },
            (!canSubmit || submitting) && styles.buttonDisabled,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleSignUp}
        >
          {submitting ? (
            <ActivityIndicator />
          ) : (
            <Text style={[styles.buttonText, { color: bgColor }]}>Sign in</Text>
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
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
});
