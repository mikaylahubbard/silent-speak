import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import CardList from "../../../components/cards/card-list";

const HomeScreen = () => {
  const [blurred, setBlurred] = useState(false);

  const router = useRouter();
  return (
    <View className="flex-1 px-4 pt-2 bg-white">
      <CardList
        onExpand={() => setBlurred(true)}
        onClose={() => setBlurred(false)}
      />

      {blurred && (
        <BlurView
          intensity={40}
          tint="dark"
          style={StyleSheet.absoluteFillObject}
        />
      )}
    </View>
  );
};

export default HomeScreen;
