import { useSession } from "@/context";
import { User } from "@firebase/auth";
import React from "react";
import { Modal, Pressable, Text, View } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onResend: (user: User) => void;
  user: User | null;
};

const EmailVerificationModal = ({
  visible,
  onClose,
  onResend,
  user,
}: Props) => {
  const { palette, modePalette } = useSession();
  const color = palette[600];

  const handleResend = () => {
    if (user) {
      onResend(user);
    }
  };

  const handleClose = () => {
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
            Email Verification Sent
          </Text>

          <Text
            className="text-base font-light mb-2"
            style={{ color: modePalette.primaryText }}
          >
            We have sent a email to the provided address. Please click the link
            in the email to verify.
          </Text>
          <Text
            className="text-sm font-extralight mb-4"
            style={{ color: modePalette.primaryText }}
          >
            This email will most likely end up in spam
          </Text>
          <Text className="text-sm text-red-600 font-light mb-4">
            Warning: you will not be able to change your password if your email
            is not authenticated!
          </Text>

          <View className="flex-row justify-end gap-3">
            <Pressable
              className="bg-neutral-200 px-4 py-2 rounded-md"
              onPress={handleClose}
              style={{ backgroundColor: modePalette.tertiaryBg }}
            >
              <Text style={{ color: modePalette.tertiaryText }}>Close</Text>
            </Pressable>

            <Pressable
              className="px-4 py-2 rounded-md"
              style={{ backgroundColor: color }}
              onPress={handleResend}
            >
              <Text className="text-white">Resend</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EmailVerificationModal;
