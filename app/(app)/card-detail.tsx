import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const CardDetailScreen = () => {
  const { cardId, title, description } = useLocalSearchParams<{
    cardId: string;
    title: string;
    description: string;
  }>();

  return (
    <View style={styles.screen}>
      <Text style={{ fontSize: 20 }}>
        This is the card detail screen for {cardId}
      </Text>
      <Text style={{ fontSize: 20 }}>{title}</Text>
      <Text style={{ fontSize: 14 }}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 20,
  },
});

export default CardDetailScreen;
