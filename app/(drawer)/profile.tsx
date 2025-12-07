import { StyleSheet, Text, View } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Mikayla Hubbard</Text>
      <Text style={styles.email}>mikayla@example.com</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 70,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
  },
  email: {
    fontSize: 16,
    color: "gray",
    marginBottom: 40,
  },
});
