import { useSession } from "@/context";
import Feather from "@expo/vector-icons/Feather";
import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
interface Card {
  id: string | number;
  title: string;
  description: string;
}

interface ExpandedCardOverlayProps {
  card: Card;
  onClose: () => void;
}

const ExpandedCardOverlay = ({ card, onClose }: ExpandedCardOverlayProps) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { modePalette } = useSession();
  const insets = useSafeAreaInsets();

  return (
    <View
      className="absolute inset-0 z-[1000] justify-center items-center"
      pointerEvents="box-none"
    >
      <TouchableOpacity className="absolute inset-0" onPress={onClose} />
      <View
        className="w-[85%] bg-white rounded-2xl p-5"
        style={{ backgroundColor: modePalette.tertiaryBg }}
      >
        <View className="flex-row justify-between">
          <TouchableOpacity onPress={() => setIsFullScreen(true)}>
            <Feather
              name="maximize"
              size={24}
              color={modePalette.primaryText}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <Feather name="x" size={24} color={modePalette.primaryText} />
          </TouchableOpacity>
        </View>
        <Text
          className="text-3xl font-bold text-center pt-5"
          style={{ color: modePalette.primaryText }}
        >
          {card.title}
        </Text>
        <Text
          className="text-base mt-2 pb-12"
          style={{ color: modePalette.primaryText }}
        >
          {card.description}
        </Text>
      </View>

      {/* Fullscreen Modal */}
      <Modal
        visible={isFullScreen}
        onRequestClose={() => setIsFullScreen(false)}
      >
        <View
          className="flex-1 bg-white justify-center items-center w-full h-full p-3"
          style={{ backgroundColor: modePalette.tertiaryBg }}
        >
          <View
            className="absolute left-0 right-0 flex-row justify-between p-4"
            style={{ top: insets.top }}
          >
            <TouchableOpacity onPress={() => setIsFullScreen(false)}>
              <Feather
                name="minimize"
                size={24}
                color={modePalette.primaryText}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={24} color={modePalette.primaryText} />
            </TouchableOpacity>
          </View>
          <Text
            className="text-5xl font-bold text-center p-3 mt-10"
            style={{ color: modePalette.primaryText }}
          >
            {card.title}
          </Text>
          <Text
            className="text-xl p-3 mt-4"
            style={{ color: modePalette.primaryText }}
          >
            {card.description}
          </Text>
          <TouchableOpacity
            onPress={onClose}
            className="mt-5 p-3 bg-gray-300 rounded-full"
            style={{ backgroundColor: modePalette.secondaryBg }}
          >
            <Text style={{ color: modePalette.secondaryText }}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ExpandedCardOverlay;
