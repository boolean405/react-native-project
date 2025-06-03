import { StatusBar } from "expo-status-bar";
import { Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import SafeScreen from "../components/safe-screen";
// import useAuthStore from "../store/authStore";
// import { useEffect } from "react";

export default function RootLayout() {
  // const router = useRouter();
  // const segments = useSegments();
  // const { user, checkAuth } = useAuthStore();

  // console.log(user);

  // useEffect(() => {
  //   checkAuth();
  // }, []);

  // // Navigation based on the state
  // useEffect(() => {
  //   const isAuthScreen = segments[0] === "(auth)";
  //   const isSignedIn = user;

  //   // if (!isAuthScreen && !isSignedIn) {
  //   //   router.replace("/(auth)");
  //   // } else if (isAuthScreen && isSignedIn) {
  //   //   router.replace("/(tabs)");
  //   // }
  // }, [user, segments]);

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="verify" />
        </Stack>
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
