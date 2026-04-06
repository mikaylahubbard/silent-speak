// import { Stack } from "expo-router";
import { useSession } from "@/context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { router } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { Image, Pressable, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  const { signOut, user, palette, modePalette, mode } = useSession();
  const images = {
    light: require("../../../assets/images/silent_speak_long_logo.png"),
    dark: require("../../../assets/images/Silent_Speak_Long_Logo_Dark.png"),
    // add more variants as needed
  };
  const LogoTitle = () => (
    <Image className="w-36 h-auto" source={images[mode]} resizeMode="contain" />
  );
  const handleLogout = async () => {
    await signOut();
    router.replace("/login");
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={{
          headerStyle: {
            // backgroundColor: "#d4d4d4",
            backgroundColor: modePalette.headerBg,
          },
          drawerStyle: {
            // backgroundColor: "#f5f5f5",
            backgroundColor: modePalette.tertiaryBg,
          },
          // drawerActiveTintColor: "#f5f5f5",
          // drawerActiveBackgroundColor: "#525252",
          // headerTintColor: "#525252",
          drawerActiveTintColor: modePalette.activeText,
          drawerActiveBackgroundColor: modePalette.activeBg,
          drawerInactiveTintColor: modePalette.tertiaryText,
          headerTintColor: modePalette.headerTint,
          drawerHideStatusBarOnOpen: true,
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Home",
            title: "My Cards",
            headerTitle: () => <LogoTitle />,
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
            headerRight: () => (
              <Pressable
                onPress={() => {
                  handleLogout();
                }}
                className="pe-4"
              >
                <Text className="font-semibold" style={{ color: palette[900] }}>
                  Log out
                </Text>
              </Pressable>
            ),
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: "Profile",
            title: "My Profile",
            headerTitle: () => null,
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                size={size}
                color={color}
              />
            ),
            headerRight: () => (
              <Pressable
                onPress={() => {
                  handleLogout();
                }}
                className="pe-4"
              >
                <Text className="font-semibold" style={{ color: palette[700] }}>
                  Log out
                </Text>
              </Pressable>
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>

    // <Stack>
    //   <Stack.Screen name="index" options={{ title: "Home" }} />
    //   <Stack.Screen name="card-detail" options={{title: "Card"}} />
    // </Stack>
  );
}
