import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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

  return (
    <View style={styles.overlay} pointerEvents="box-none">
      <TouchableOpacity style={styles.backdrop} onPress={onClose} />
      <View style={styles.floatingCard}>
        <Text
          style={styles.openFullscreen}
          onPress={() => setIsFullScreen(true)}
        >
          Fullscreen
        </Text>
        <Text style={styles.title}>{card.title}</Text>
        <Text style={styles.description}>{card.description}</Text>
      </View>

      {/* Fullscreen Modal */}
      <Modal
        visible={isFullScreen}
        onRequestClose={() => setIsFullScreen(false)}
      >
        <View style={styles.fullScreenContainer}>
          <TouchableOpacity
            onPress={() => setIsFullScreen(false)}
            style={styles.xButton}
          >
            <Text>X</Text>
          </TouchableOpacity>

          <Text style={styles.largeTitle}>{card.title}</Text>
          <Text style={styles.largeDescription}>{card.description}</Text>
          <TouchableOpacity
            onPress={() => setIsFullScreen(false)}
            style={styles.closeButton}
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
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    paddingTop: 50,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    paddingBottom: 50,
  },
  openFullscreen: {
    fontSize: 10,
    alignSelf: "flex-end",
  },
  fullScreenContainer: {
    flex: 1, // Fills the entire screen
    backgroundColor: "white", // Set a background color
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  largeTitle: {
    fontSize: 50,
    fontWeight: "bold",
    padding: 10,
  },
  largeDescription: {
    fontSize: 20,
    padding: 10,
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
