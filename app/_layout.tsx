import { SessionProvider } from "@/context";
import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Root() {
  return (
    <SessionProvider>
      {/* 
        GestureHandlerRootView is required for:
        - Drawer navigation gestures
        - Swipe gestures
        - Other gesture-based interactions
        Must wrap the entire app to function properly
      */}
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* 
          Slot renders child routes dynamically
          This includes both (app) and (auth) group routes
        */}
        <Slot />
      </GestureHandlerRootView>
    </SessionProvider>
  );
}
