import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

interface CardItemProps {
  id: string | number;
  title: string;
  description: string;
  expand?: () => void;
}

const CardItem = ({ id, title, description, expand }: CardItemProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={expand} activeOpacity={0.8}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.descr}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#c5c5c5",
    borderRadius: 10,
    marginVertical: 5,
    padding: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
  },
  descr: {
    fontSize: 14,
  },
});
export default CardItem;
