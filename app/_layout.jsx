import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          {/* don't forget to rechane to index */}
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="index" /> 
        </Stack>
      </SafeScreen>
      <StatusBar style="dark"/>
    </SafeAreaProvider>
  );
}
