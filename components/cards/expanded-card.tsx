import Feather from "@expo/vector-icons/Feather";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
  const insets = useSafeAreaInsets();

  return (
    <View
      className="absolute inset-0 z-[1000] justify-center items-center"
      pointerEvents="box-none"
    >
      <TouchableOpacity className="absolute inset-0" onPress={onClose} />
      <View className="w-[85%] bg-white rounded-2xl p-5">
        <View className="flex-row justify-between">
          <TouchableOpacity onPress={() => setIsFullScreen(true)}>
            <Feather name="maximize" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <Feather name="x" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Text className="text-3xl font-bold text-center pt-5">
          {card.title}
        </Text>
        <Text className="text-base mt-2 pb-12">{card.description}</Text>
      </View>

      {/* Fullscreen Modal */}
      <Modal
        visible={isFullScreen}
        onRequestClose={() => setIsFullScreen(false)}
      >
        <View className="flex-1 bg-white justify-center items-center w-full h-full p-3">
          <View
            className="absolute left-0 right-0 flex-row justify-between p-4"
            style={{ top: insets.top }}
          >
            <TouchableOpacity onPress={() => setIsFullScreen(false)}>
              <Feather name="minimize" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <Text className="text-5xl font-bold text-center p-3 mt-10">
            {card.title}
          </Text>
          <Text className="text-xl p-3 mt-4">{card.description}</Text>
          <TouchableOpacity
            onPress={onClose}
            className="mt-5 p-3 bg-gray-300 rounded-full"
          >
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  floatingCard: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 14,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 20,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    paddingBottom: 50,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconRowFullscreen: {
    position: "absolute",
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    padding: 10,
  },
  largeTitle: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    marginTop: 40,
  },
  largeDescription: {
    fontSize: 20,
    padding: 10,
    marginTop: 15,
  },
  xButton: {
    padding: 20,
    alignSelf: "flex-end",
    verticalAlign: "top",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: "20%",
  },
});

export default ExpandedCardOverlay;
