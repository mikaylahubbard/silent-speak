import { useSession } from "@/context";
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
  const { palette, modePalette } = useSession();
  const color = palette[600];

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
        <View
          className="w-11/12 bg-white rounded-xl p-6"
          style={{ backgroundColor: modePalette.primaryBg }}
        >
          <Text
            className="text-xl font-semibold mb-4"
            style={{ color: modePalette.primaryText }}
          >
            Create a Card
          </Text>

          <TextInput
            className="border border-gray-300 rounded-md p-3 mb-3"
            style={{
              borderColor: modePalette.accents,
              color: modePalette.primaryText,
            }}
            placeholder="Card title"
            placeholderTextColor={modePalette.tertiaryText}
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            className="border border-gray-300 rounded-md p-3 mb-4"
            style={{
              borderColor: modePalette.accents,
              color: modePalette.primaryText,
            }}
            placeholder="Card message"
            placeholderTextColor={modePalette.tertiaryText}
            multiline
            value={message}
            onChangeText={setMessage}
          />

          <View className="flex-row justify-end gap-3">
            <Pressable
              className="bg-neutral-200 px-4 py-2 rounded-md"
              style={{ backgroundColor: modePalette.tertiaryBg }}
              onPress={onClose}
            >
              <Text style={{ color: modePalette.tertiaryText }}>Cancel</Text>
            </Pressable>

            <Pressable
              className="px-4 py-2 rounded-md"
              style={{ backgroundColor: color }}
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
