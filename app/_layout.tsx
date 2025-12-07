import { Stack } from "expo-router";
export default function RootLayout() {
    return (
    <Stack>
       <Stack.Screen
        name="(drawer)"
        options={{ headerShown: false,  title: "My Cards"}}
      />
      <Stack.Screen name="card-detail" options={{title: "Card"}} />
    </Stack>
  );
}
