import { useSession } from "@/context";
import React, { useEffect, useState } from "react";
import { Switch, Text, View } from "react-native";

export default function Profile() {
  const { userDoc } = useSession();
  const profile = userDoc?.profile;

  const [isEnabled, setIsEnabled] = useState(false);

  const [form, setForm] = useState({
    username: "",
    phone: "",
    age: "",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        username: profile?.name ?? "",
        phone: profile?.phoneNumber ?? "",
        age: profile?.age ?? "",
      });
    }
  }, [profile]);

  if (!profile) {
    return <Text>Loading profile...</Text>;
  }

  return (
    <View className="flex-1">
      <View className="justify-center items-center pt-16 pb-12 bg-neutral-200">
        <Text className="text-3xl font-bold text-neutral-700">
          {profile.name}
        </Text>

        <Text className="text-lg text-neutral-500 font-light">
          {profile.email}
        </Text>
      </View>

      <View className="p-10">
        {/* Personal Info */}
        <View>
          <Text className="font-bold text-xl text-neutral-800">
            Personal Info
          </Text>

          <View className="border-b border-neutral-300 my-2" />

          <Text className="p-3">Username: {profile.name}</Text>

          <Text className="p-3">
            Phone Number: {profile.phoneNumber ?? "-"}
          </Text>

          <Text className="p-3">Age: {profile.age ?? "-"}</Text>

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

            <Switch
              trackColor={{ false: "#404040", true: "#5b21b6" }}
              thumbColor="#f5f5f5"
              ios_backgroundColor="#404040"
              onValueChange={setIsEnabled}
              value={isEnabled}
              style={{ transform: [{ scale: 0.7 }] }}
            />
          </View>

          <Text className="p-3">Set Highlight color:</Text>
        </View>
      </View>
    </View>
  );
}
