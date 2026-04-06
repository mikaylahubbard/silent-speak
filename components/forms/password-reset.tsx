import { useSession } from "@/context";
import React, { useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (email?: string) => void;
  showEmailInput: boolean;
};

const ChangePasswordModal = ({
  visible,
  onClose,
  onSubmit,
  showEmailInput = false,
}: Props) => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { palette, modePalette } = useSession();
  const color = palette[600];

  const handleAdd = () => {
    if (email !== "") {
      onSubmit(email);
    } else {
      onSubmit();
    }
    setSuccessMessage(
      "If an account exists, a password reset email has been sent.",
    );
  };

  const handleClose = () => {
    setEmail("");
    setSuccessMessage("");
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
            Change Password
          </Text>

          {showEmailInput && (
            <TextInput
              style={{
                borderColor: modePalette.accents,
                color: modePalette.primaryText,
              }}
              placeholderTextColor={modePalette.tertiaryText}
              className="border border-gray-300 rounded-md p-3 mb-3"
              placeholder="Enter Email"
              value={email}
              onChangeText={setEmail}
            />
          )}

          <Text
            className="text-base font-light mb-4"
            style={{ color: modePalette.primaryText }}
          >
            We will send a message to your email that will allow you to change
            your password
          </Text>
          <Text
            className="text-xs font-extralight mb-4"
            style={{ color: modePalette.primaryText }}
          >
            Note: This email will most likely end up in spam
          </Text>
          {successMessage !== "" && (
            <Text className="text-green-600 mb-3 text-center">
              {successMessage}
            </Text>
          )}
          <View className="flex-row justify-end gap-3">
            <Pressable
              className="bg-neutral-200 px-4 py-2 rounded-md"
              style={{ backgroundColor: modePalette.tertiaryBg }}
              onPress={handleClose}
            >
              <Text style={{ color: modePalette.tertiaryText }}>Cancel</Text>
            </Pressable>

            <Pressable
              className="px-4 py-2 rounded-md"
              style={{ backgroundColor: color }}
              onPress={handleAdd}
            >
              <Text className="text-white">Send Email</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ChangePasswordModal;
