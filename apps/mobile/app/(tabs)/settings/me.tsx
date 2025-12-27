import { ActivityIndicator, Pressable, StyleSheet } from "react-native";

import { Text, useThemeColor, View } from "@/components/Themed";
import { clearToken } from "@/src/utils/token";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { getMe } from "@/src/api/auth";
import { ApiError } from "@/src/utils/apiError";
import { ClientError } from "@/src/utils/clientError";

export default function UserScreen() {
  const borderColor = useThemeColor({}, "borderColor");
  const textColor = useThemeColor({}, "text");
  const bgColor = useThemeColor({}, "background");
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<{
    id: string;
    name: string | null;
    email: string;
  } | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const me = await getMe();
      setUser(me);
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) {
        await clearToken();
        router.replace("/(tabs)/settings");
        return;
      }
      if (e instanceof ClientError) {
        setError(e.message);
        return;
      }
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    await clearToken();
    router.replace("/(tabs)/settings");
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await load();
      if (cancelled) return;
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
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

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No user</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user.name ?? "User"}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Pressable
        onPress={handleSignOut}
        style={({ pressed }) => [
          styles.button,
          { borderColor, backgroundColor: textColor },
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={[styles.buttonText, { color: bgColor }]}>Sign out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
