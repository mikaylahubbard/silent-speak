import { useSession } from "@/context";
// import { Image } from "expo-image";
import { Link, router } from "expo-router";

import { useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import "../global.css";

/**
 *
 * SignIn component handles user authentication through email and password
 * @returns {JSX.Element} Sign-in form component
 */

const Login = () => {
  // ============================================================================
  // Hooks & State
  // ============================================================================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, error } = useSession();

  // ============================================================================
  // Handlers
  // ============================================================================

  /**
   * Handles the sign-in process
   * @returns {Promise<Models.User<Models.Preferences> | null>}
   */
  const handleLogin = async () => {
    try {
      return await signIn(email, password);
    } catch (err) {
      console.log("[handleLogin] ==>", err);
      return null;
    }
  };

  /**
   * Handles the sign-in button press
   */
  const handleSignInPress = async () => {
    const resp = await handleLogin();
    router.replace("/");
  };

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <View className="flex-1 justify-center items-center p-4">
      {/* Welcome Section */}

      <Image
        className="h-36 w-auto"
        source={require("../assets/images/silent_speak_transparent_logo.png")}
        resizeMode="contain"
      />
      <Text className="text-sm text-gray-500 py-3">
        Communicate on Your Terms
      </Text>

      {/* Form Section */}
      <View className="w-full max-w-[300px] mb-8">
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

        <View>
          <Text className="text-sm font-medium text-gray-700 mb-1 ml-1">
            Password
          </Text>
          <TextInput
            placeholder="Your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            textContentType="password"
            className="w-full p-3 border border-gray-300 rounded-lg text-base bg-white"
          />
        </View>
      </View>
      {error && <Text style={{ color: "red", marginBottom: 12 }}>{error}</Text>}

      {/* Sign In Button */}
      <Pressable
        onPress={handleSignInPress}
        className="bg-neutral-700 w-4/12 max-w-[300px] py-3 rounded-lg"
      >
        <Text className="text-white text-base font-semibold text-center">
          Log In
        </Text>
      </Pressable>

      {/* Sign Up Link */}

      <Text className="text-gray-600 pt-5 pb-2">
        Don&apos;t have an account?
      </Text>
      <Link href="/register" asChild className="ml-2">
        <Pressable>
          <Text className="text-blue-600 font-semibold">Register Now</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default Login;
