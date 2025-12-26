import { Pressable, StyleSheet } from "react-native";
import { Text, useThemeColor, View } from "@/components/Themed";
import { router, useRouter } from "expo-router";
import { useEffect } from "react";
import { getToken } from "@/src/utils/token";

export default function SettingsScreen() {
  const borderColor = useThemeColor({}, "borderColor");
  const textColor = useThemeColor({}, "text");
  const bgColor = useThemeColor({}, "background");

  const router = useRouter();
  useEffect(() => {
    (async () => {
      const token = await getToken();
      if (token) {
        router.replace("/(tabs)/settings/me");
      }
    })();
  }, [router]);

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
            { borderColor, backgroundColor: bgColor },
            pressed && styles.buttonPressed,
          ]}
          onPress={handleSignIn}
        >
          <Text style={[styles.buttonText, { color: textColor }]}>Sign in</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { borderColor, backgroundColor: textColor },
            pressed && styles.buttonPressed,
          ]}
          onPress={handleSignUp}
        >
          <Text style={[styles.buttonText, { color: bgColor }]}>Sign up</Text>
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
