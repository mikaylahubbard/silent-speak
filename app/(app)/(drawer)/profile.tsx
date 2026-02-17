import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { auth } from "../../../lib/firebase-config";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    username: "",
    phone: "",
    age: "",
  });

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        setForm({
          username: user.displayName ?? "",
          phone: user.phoneNumber ?? "",
          age: "", // will come from Firestore later
        });
      }
    });
    return subscriber;
  }, []);

  if (!user) {
    return <Text>Loading profile...</Text>;
  } else
    return (
      <View style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.name}>{user.displayName}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
        <View style={styles.body}>
          {/* Personal Info */}
          <View>
            <Text style={styles.heading}>Personal Info</Text>
            <View style={styles.line} />
            <Text style={styles.text}>Username: {user.displayName}</Text>
            {user.phoneNumber ? (
              <Text style={styles.text}>Phone Number: {user.phoneNumber}</Text>
            ) : (
              <Text style={styles.text}>Phone Number: -</Text>
            )}
            {/* will need to create firestore in order to display custom info like age */}
            <Text style={styles.text}>Age: -</Text>

            <Text style={styles.text}>Change Password</Text>
          </View>
          {/* Settings */}
          <View>
            <Text style={styles.heading}>Settings</Text>
            <View style={styles.line} />
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
