import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface CardItemProps {
  id: string | number;
  title: string;
  description: string;
}

const CardItem = ({ id, title, description }: CardItemProps) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "../card-detail",
          params: { cardId: String(id), title, description },
        })
      }
      style={styles.card}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={{ fontSize: 14 }}>{description}</Text>
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
});
export default CardItem;
