import { useSession } from "@/context";
import React, { useEffect, useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
};

const EditProfileModal = ({ visible, onClose }: Props) => {
  const { userDoc, editProfile } = useSession();
  const profile = userDoc?.profile;
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState("");
  const { palette } = useSession();
  const color = palette[600];

  useEffect(() => {
    if (profile) {
      setUsername(profile.name || "-");
      setPhoneNumber(profile.phoneNumber || "-");
      setAge(profile.age ? String(profile.age) : "-");
    }
  }, [profile]);

  const handleUpdate = () => {
    // change doc
    editProfile(username, phoneNumber, age);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/40">
        <View className="w-11/12 bg-white rounded-xl p-6">
          <Text className="text-xl font-semibold mb-4">Edit Profile Info</Text>

          <Text className=" text-neutral-500 p-1">Username:</Text>
          <TextInput
            className="border border-gray-300 rounded-md p-3 mb-3"
            // placeholder="Card title"
            value={username}
            onChangeText={setUsername}
          />

          <Text className=" text-neutral-500 p-1">Phone Number:</Text>
          <TextInput
            className="border border-gray-300 rounded-md p-3 mb-4"
            multiline
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />

          <Text className=" text-neutral-500 p-1">Age:</Text>
          <TextInput
            className="border border-gray-300 rounded-md p-3 mb-4"
            multiline
            value={age}
            onChangeText={setAge}
          />

          <View className="flex-row justify-end gap-3">
            <Pressable
              className="bg-neutral-200 px-4 py-2 rounded-md"
              onPress={onClose}
            >
              <Text>Cancel</Text>
            </Pressable>

            <Pressable
              className="px-4 py-2 rounded-md"
              style={{ backgroundColor: color }}
              onPress={() => {
                console.log("Pressed update");
                handleUpdate();
              }}
            >
              <Text className="text-white">Update</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditProfileModal;
