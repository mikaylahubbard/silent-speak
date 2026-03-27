import EmailVerificationModal from "@/components/forms/email-verification";
import { useSession } from "@/context";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";

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
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [newUser, setNewUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, error, clearError, signOut, sendNewEmailVerification } =
    useSession();

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

  const handleCloseModal = async () => {
    setShowVerifyModal(false);
    router.replace("/login");
  };

  /**
   * Handles the sign-up button press
   */
  const handleSignUpPress = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const resp = await handleRegister();
    setIsLoading(false);

    if (resp) {
      setNewUser(resp);
      await sendNewEmailVerification(resp);
      await setShowVerifyModal(true);
      await signOut();
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
            onFocus={clearError}
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
            onFocus={clearError}
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
            onFocus={clearError}
            className="w-full p-3 border border-gray-300 rounded-lg text-base bg-white"
          />
        </View>
      </View>

      {error && <Text style={{ color: "red", marginBottom: 12 }}>{error}</Text>}

      {/* Sign Up Button */}
      <Pressable
        onPress={handleSignUpPress}
        className="bg-neutral-700 w-4/12 max-w-[300px] py-3 rounded-lg"
        disabled={isLoading}
      >
        <Text className="text-white text-base font-semibold text-center">
          {isLoading ? "Registering..." : "Register"}
        </Text>
      </Pressable>

      {/* Sign In Link */}

      <Text className="text-gray-600 pt-5 pb-2">Already have an account?</Text>
      <Link href="/login" asChild className="ml-2">
        <Pressable onPress={clearError}>
          <Text className="text-blue-600 font-semibold">Log in</Text>
        </Pressable>
      </Link>

      <EmailVerificationModal
        visible={showVerifyModal}
        onClose={handleCloseModal}
        onResend={sendNewEmailVerification}
        user={newUser}
      />
    </View>
  );
};
export default Register;
