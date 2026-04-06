import { useSession } from "@/context";
import React, { useEffect, useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (title: string, message: string, id: string) => void;
  currentTitle: string;
  currentMessage: string;
  id: string;
};

const EditCardModal = ({
  visible,
  onClose,
  onSubmit,
  currentTitle,
  currentMessage,
  id,
}: Props) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const { palette, modePalette } = useSession();
  const color = palette[600];

  useEffect(() => {
    setTitle(currentTitle);
    setMessage(currentMessage);
  }, [currentTitle, currentMessage]);

  const handleAdd = () => {
    // submit title and message
    onSubmit(title, message, id);
    // //reset modal and close
    // setTitle("");
    // setMessage("");
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
            Edit Card
          </Text>

          <TextInput
            className="border border-gray-300 rounded-md p-3 mb-3"
            // placeholder="Card title"
            style={{
              borderColor: modePalette.accents,
              color: modePalette.primaryText,
            }}
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            className="border border-gray-300 rounded-md p-3 mb-4"
            // placeholder="Card message"
            style={{
              borderColor: modePalette.accents,
              color: modePalette.primaryText,
            }}
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
              <Text className="text-white">Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditCardModal;
