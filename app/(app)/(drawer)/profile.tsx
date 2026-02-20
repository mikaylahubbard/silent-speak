import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { auth } from "../../../lib/firebase-config";
export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [Enable, setEnable] = useState("courses");
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
      <View className="flex-1">
        <View className="justify-center items-center pt-16 pb-12 bg-neutral-200">
          <Text className="text-3xl font-bold text-neutral-700 ">
            {user.displayName}
          </Text>
          <Text className="text-lg text-neutral-500 font-light">
            {user.email}
          </Text>
        </View>
        <View className="p-10">
          {/* Personal Info */}
          <View>
            <Text className="font-bold text-xl text-neutral-800">
              Personal Info
            </Text>
            <View className="border-b border-neutral-300 my-2" />
            <Text className="p-3">Username: {user.displayName}</Text>
            {user.phoneNumber ? (
              <Text className="p-3">Phone Number: {user.phoneNumber}</Text>
            ) : (
              <Text className="p-3">Phone Number: -</Text>
            )}
            {/* will need to create firestore in order to display custom info like age */}
            <Text className="p-3">Age: -</Text>

            <Text className="p-3 text-violet-800">Change Password</Text>
          </View>
          {/* Settings */}
          <View>
            <Text className="font-bold text-xl text-neutral-800 pt-5">
              Settings
            </Text>
            <View className="border-b border-neutral-300 my-2" />
            <View className="flex-row items-center justify-between">
              <Text className="p-3">Dark Mode</Text>
              {/* NEEDS IMPLEMENTATION */}
              <Switch
                trackColor={{ false: "#404040", true: "#5b21b6" }}
                thumbColor={isEnabled ? "#f5f5f5" : "#f5f5f5"}
                ios_backgroundColor="#404040"
                onValueChange={setIsEnabled}
                value={isEnabled}
                style={{ transform: [{ scale: 0.7 }] }}
              />
            </View>
            {/* NEEDS IMPLEMENTATION */}
            <Text className="p-3">Set Highlight color:</Text>
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
