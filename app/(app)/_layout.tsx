import { useSession } from "@/context";
import { Redirect, Stack } from "expo-router";
import { Text } from "react-native";

// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.setOptions({
//   duration: 1000,
//   fade: true,
// });

/**
 * This Layout serves as the root authentication wrapper for the main app routes.
 * It ensures:
 * 1. Protected routes are only accessible to authenticated users
 * 2. Loading states are handled appropriately
 * 3. Unauthenticated users are redirected to sign-in
 *
 * This layout wraps all routes within the (app) directory, but not (auth) routes,
 * allowing authentication flows to remain accessible.
 */

export default function RootLayout() {
  const { user, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!user) {
    return <Redirect href="/login" />;
  }
  return (
    <Stack>
      <Stack.Screen
        name="(drawer)"
        options={{ headerShown: false, title: "My Cards" }}
      />
      <Stack.Screen name="card-detail" options={{ title: "Card" }} />
    </Stack>
  );
}
