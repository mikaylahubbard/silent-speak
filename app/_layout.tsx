import { Stack } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.setOptions({
//   duration: 1000,
//   fade: true,
// });

export default function RootLayout() {
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
