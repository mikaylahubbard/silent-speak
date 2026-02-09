import { useSession } from "@/context";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

/**
 * SignIn component handles user authentication through email and password
 * @returns {JSX.Element} Sign-in form component
 */
const Login = () => {
  // ============================================================================
  // Hooks & State
  // ============================================================================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useSession();

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
    router.replace("/(app)/(drawer)/index");
  };

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <View style={styles.screen}>
      {/* Welcome Section */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTitle}>Welcome Back</Text>
        <Text style={styles.welcomeSubtitle}>Please sign in to continue</Text>
      </View>

      {/* Form Section */}
      <View style={styles.formContainer}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="name@mail.com"
            value={email}
            onChangeText={setEmail}
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
        </View>

        <View>
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            textContentType="password"
            style={styles.input}
          />
        </View>
      </View>

      {/* Sign In Button */}
      <Pressable onPress={handleSignInPress} style={styles.signInButton}>
        <Text style={styles.signInText}>Sign In</Text>
      </Pressable>

      {/* Sign Up Link */}
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don&apos;t have an account?</Text>
        <Link href="/register" asChild style={styles.signUpLink}>
          <Pressable>
            <Text style={styles.signUpLinkText}>Register</Text>
          </Pressable>
        </Link>
      </View>
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

export default Login;
