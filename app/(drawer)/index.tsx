import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CardList from "../../components/cards/card-list";

const HomeScreen = () => {
  const [blurred, setBlurred] = useState(false);

  const router = useRouter();
  return (
    <View style={styles.screen}>
      <Text>This is the home screen</Text>

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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
});

export default HomeScreen;
