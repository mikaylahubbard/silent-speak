import React, { useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (title: string, message: string) => void;
};

const NewCardModal = ({ visible, onClose, onSubmit }: Props) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleAdd = () => {
    // submit title and message
    onSubmit(title, message);
    //reset modal and close
    setTitle("");
    setMessage("");
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/40">
        <View className="w-11/12 bg-white rounded-xl p-6">
          <Text className="text-xl font-semibold mb-4">Create a Card</Text>

          <TextInput
            className="border border-gray-300 rounded-md p-3 mb-3"
            placeholder="Card title"
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            className="border border-gray-300 rounded-md p-3 mb-4"
            placeholder="Card message"
            multiline
            value={message}
            onChangeText={setMessage}
          />

          <View className="flex-row justify-end gap-3">
            <Pressable onPress={onClose}>
              <Text>Cancel</Text>
            </Pressable>

            <Pressable
              className="bg-violet-500 px-4 py-2 rounded-md"
              onPress={handleAdd}
            >
              <Text className="text-white">Add</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NewCardModal;
