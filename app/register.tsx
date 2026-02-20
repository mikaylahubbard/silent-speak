import { useSession } from "@/context";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

/**
 * SignUp component handles new user registration
 * @returns {JSX.Element} Sign-up form component
 */

const Register = () => {
  // ============================================================================
  // Hooks & State
  // ============================================================================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { signUp, error, clearError } = useSession();

  // ============================================================================
  // Handlers
  // ============================================================================

  /**
   * Handles the registration process
   * @returns {Promise<Models.User<Models.Preferences> | null>}
   */
  const handleRegister = async () => {
    return await signUp(email, password, name);
  };

  /**
   * Handles the sign-up button press
   */
  const handleSignUpPress = async () => {
    const resp = await handleRegister();
    if (resp) {
      router.replace("/");
    }
  };

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <View className="flex-1 justify-center items-center p-4">
      {/* Welcome Section */}
      <Image
        className="h-28 w-auto"
        source={require("../assets/images/silent_speak_transparent_logo.png")}
        resizeMode="contain"
      />

      <Text className="text-sm text-gray-500 py-3">
        Create an account to get started
      </Text>

      {/* Form Section */}
      <View className="w-full max-w-[300px] mb-8">
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-1 ml-1">
            Name
          </Text>
          <TextInput
            placeholder="Your full name"
            value={name}
            onChangeText={setName}
            textContentType="name"
            autoCapitalize="words"
            className="w-full p-3 border border-gray-300 rounded-lg text-base bg-white"
          />
        </View>
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-1 ml-1">
            Email
          </Text>
          <TextInput
            placeholder="name@mail.com"
            value={email}
            onChangeText={setEmail}
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            className="w-full p-3 border border-gray-300 rounded-lg text-base bg-white"
          />
        </View>
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-1 ml-1">
            Password
          </Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Create a password"
            secureTextEntry={true} // This is the key prop
            value={password}
            onChangeText={setPassword}
            className="w-full p-3 border border-gray-300 rounded-lg text-base bg-white"
          />
        </View>
      </View>

      {error && <Text style={{ color: "red", marginBottom: 12 }}>{error}</Text>}

      {/* Sign Up Button */}
      <Pressable
        onPress={handleSignUpPress}
        className="bg-neutral-700 w-4/12 max-w-[300px] py-3 rounded-lg"
      >
        <Text className="text-white text-base font-semibold text-center">
          Register
        </Text>
      </Pressable>

      {/* Sign In Link */}

      <Text className="text-gray-600 pt-5 pb-2">Already have an account?</Text>
      <Link href="/login" asChild className="ml-2">
        <Pressable>
          <Text className="text-blue-600 font-semibold">Log in</Text>
        </Pressable>
      </Link>
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
    marginBottom: 16, // replaces space-y-4
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

  // Sign up button
  signUpButton: {
    backgroundColor: "#2563eb", // blue-600
    width: "100%",
    maxWidth: 300,
    paddingVertical: 12,
    borderRadius: 8,
  },
  signUpText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },

  // Sign in link section
  signInContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
  },
  signInText: {
    color: "#4b5563", // gray-600
  },
  signInLink: {
    marginLeft: 8,
  },
  signInLinkText: {
    color: "#2563eb", // blue-600
    fontWeight: "600",
  },
});

export default Register;
