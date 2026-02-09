import { StyleSheet, Text, View } from "react-native";

export default function Profile() {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.name}>Mikayla Hubbard</Text>
        <Text style={styles.email}>mikayla@example.com</Text>
      </View>
      <View style={styles.body}>
        {/* Personal Info */}
        <View>
          <Text style={styles.heading}>Personal Info</Text>
          <View style={styles.line} />;
          <Text style={styles.text}>Username: </Text>
          <Text style={styles.text}>Phone Number: </Text>
          <Text style={styles.text}>Age:</Text>
          <Text style={styles.text}>Change Password</Text>
        </View>
        {/* Settings */}
        <View>
          <Text style={styles.heading}>Settings</Text>
          <View style={styles.line} />;
          <Text style={styles.text}>Light Mode/Dark mode</Text>
          <Text style={styles.text}>Custom Theme</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    paddingTop: 70,
    backgroundColor: "#fff",
  },
  body: {
    padding: 30,
  },
  line: {
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    marginVertical: 10,
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
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginTop: 24,
  },
  text: {
    padding: 10,
  },
});
