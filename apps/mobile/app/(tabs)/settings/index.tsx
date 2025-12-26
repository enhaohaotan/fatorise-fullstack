import { Pressable, StyleSheet } from "react-native";
import { Text, useThemeColor, View } from "@/components/Themed";
import { router } from "expo-router";

export default function SettingsScreen() {
  const borderColor = useThemeColor({}, "borderColor");
  const signUpButtonColor = useThemeColor({}, "text");
  const signUpTextColor = useThemeColor({}, "background");
  const signInButtonColor = useThemeColor({}, "background");
  const signInTextColor = useThemeColor({}, "text");

  function handleSignIn() {
    router.push("/(tabs)/settings/signin");
  }

  function handleSignUp() {
    router.push("/(tabs)/settings/signup");
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { borderColor, backgroundColor: signInButtonColor },
            pressed && styles.buttonPressed,
          ]}
          onPress={handleSignIn}
        >
          <Text style={[styles.buttonText, { color: signInTextColor }]}>
            Sign in
          </Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { borderColor, backgroundColor: signUpButtonColor },
            pressed && styles.buttonPressed,
          ]}
          onPress={handleSignUp}
        >
          <Text style={[styles.buttonText, { color: signUpTextColor }]}>
            Sign up
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  email: {
    fontSize: 16,
    opacity: 0.7,
  },
  title: {
    fontSize: 20,
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
    alignItems: "center",
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  buttonPressed: { opacity: 0.7 },
});
