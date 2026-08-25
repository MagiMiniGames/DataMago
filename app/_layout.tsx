import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colors } from "../src/lib/theme";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.bg },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: "600" },
          contentStyle: { backgroundColor: colors.bg },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="kit/[id]"
          options={{ title: "Style Kit", presentation: "modal" }}
        />
      </Stack>
    </>
  );
}
