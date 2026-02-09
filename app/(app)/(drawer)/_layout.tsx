// import { Stack } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props}/>
    </DrawerContentScrollView>
  )
}

export default function DrawerLayout() {
    return (
      <GestureHandlerRootView style={{flex: 1}}>
        <Drawer 
        drawerContent={CustomDrawerContent}
        screenOptions={{ drawerHideStatusBarOnOpen: true,}}>
          <Drawer.Screen
          name="index" 
          options={{
            drawerLabel: 'Home',
            title: 'My Cards',
            drawerIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />
          }}
          />
          <Drawer.Screen name='profile' options={{
            drawerLabel: 'Profile',
            title: 'My Profile',
            drawerIcon: ({ color, size }) => <MaterialCommunityIcons name='account' size={size} color={color} />
          }}/>
        </Drawer>
      </GestureHandlerRootView>
      
    

    // <Stack>
    //   <Stack.Screen name="index" options={{ title: "Home" }} />
    //   <Stack.Screen name="card-detail" options={{title: "Card"}} />
    // </Stack>
  );
}
