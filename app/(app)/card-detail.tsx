import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const CardDetailScreen = () => {
  const { cardId, title, description } = useLocalSearchParams<{
    cardId: string;
    title: string;
    description: string;
  }>();

  return (
    <View style={styles.screen}>
      <Text style={{ fontSize: 20 }}>
        This is the card detail screen for {cardId}
      </Text>
      <Text style={{ fontSize: 20 }}>{title}</Text>
      <Text style={{ fontSize: 14 }}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // Screen container
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },

  // Welcome section
  welcomeContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2937", // gray-800
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: "#6b7280", // gray-500
  },

  // Form section
  formContainer: {
    width: "100%",
    maxWidth: 300,
    marginBottom: 32,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151", // gray-700
    marginBottom: 4,
    marginLeft: 4,
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#d1d5db", // gray-300
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#ffffff",
  },

  // Sign in button
  signInButton: {
    backgroundColor: "#2563eb", // blue-600
    width: "100%",
    maxWidth: 300,
    paddingVertical: 12,
    borderRadius: 8,
  },
  signInText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },

  // Sign up section
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
  },
  signUpText: {
    color: "#4b5563", // gray-600
  },
  signUpLink: {
    marginLeft: 8,
  },
  signUpLinkText: {
    color: "#2563eb", // blue-600
    fontWeight: "600",
  },
});

export default CardDetailScreen;
