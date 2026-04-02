import ColorGrid from "@/components/colorGrid";
import EditProfileModal from "@/components/forms/edit-profile";
import EmailVerificationModal from "@/components/forms/email-verification";
import ChangePasswordModal from "@/components/forms/password-reset";
import { useSession } from "@/context";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, Switch, Text, View } from "react-native";

export default function Profile() {
  const {
    userDoc,
    handleForgotPassword,
    user,
    sendNewEmailVerification,
    palette,
    themeName,
    setTheme,
  } = useSession();
  const profile = userDoc?.profile;

  const [isEnabled, setIsEnabled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [chagePassword, setChangePassword] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [needsVerified, setNeedsVerified] = useState(user?.emailVerified);
  const size = 28;
  const color = palette[700];

  const checkEmailVerificationStatus = async () => {
    if (!user) return;
    await user.reload();
    console.log(user.emailVerified);

    if (user.emailVerified) {
      setNeedsVerified(false);
    } else {
      setNeedsVerified(true);
    }
  };

  const handleSentVerifyEmail = async () => {
    if (user) {
      sendNewEmailVerification(user);
    }
    setShowVerifyModal(true);
    await user?.reload();
  };

  const handleCloseModal = async () => {
    setShowVerifyModal(false);
  };

  useEffect(() => {
    if (user) {
      checkEmailVerificationStatus();
    }
  }, [user]);

  if (!profile) {
    return <Text>Loading profile...</Text>;
  }

  return (
    <View className="flex-1">
      <View className="justify-center items-center pt-16 pb-12 bg-neutral-200">
        <Text className="text-3xl font-bold text-neutral-700">
          {profile.name}
        </Text>

        <Text className="text-lg text-neutral-500 font-light">
          {profile.email}
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Personal Info */}
        <View>
          <View className="flex-row items-center justify-between">
            <Text className="font-bold text-xl text-neutral-800">
              Personal Info
            </Text>
            <Pressable onPress={() => setIsEditing(true)}>
              <MaterialIcons name="create" size={size} color={color} />
            </Pressable>
          </View>

          <View className="border-b border-neutral-300 my-2" />

          <Text className="p-3">Username: {profile.name}</Text>

          <Text className="p-3">
            Phone Number: {profile.phoneNumber ?? "-"}
          </Text>

          <Text className="p-3">Age: {profile.age ?? "-"}</Text>

          <Pressable onPress={() => setChangePassword(true)}>
            <Text className="p-3" style={{ color: color }}>
              Change Password
            </Text>
          </Pressable>

          {needsVerified && (
            <View className="bg-red-100 my-4">
              <Text className="p-3 font-semibold text-red-600">
                Warning: Your Email is not verified. You will not be able to
                change your password until email verification is complete!
              </Text>
              <Pressable
                onPress={handleSentVerifyEmail}
                className="bg-red-700 w-4/12 max-w-[300px] py-2 m-3 rounded-lg"
              >
                <Text className="text-center text-white text-sm">
                  Verify Email
                </Text>
              </Pressable>
            </View>
          )}
        </View>

        {/* Settings */}
        <View>
          <Text className="font-bold text-xl text-neutral-800 pt-5">
            Settings
          </Text>

          <View className="border-b border-neutral-300 my-2" />

          <View className="flex-row items-center justify-between">
            <Text className="p-3">Dark Mode</Text>

            <Switch
              trackColor={{ false: "#404040", true: palette[800] }}
              thumbColor="#f5f5f5"
              ios_backgroundColor="#404040"
              onValueChange={setIsEnabled}
              value={isEnabled}
              style={{ transform: [{ scale: 0.7 }] }}
            />
          </View>

          <Text className="p-3">Select Highlight color:</Text>

          <ColorGrid onSelect={setTheme} selected={themeName} />

          {/* <Pressable onPress={() => setTheme("green")}>
            <Text>Switch to greeeeeen</Text>
          </Pressable> */}
        </View>
      </ScrollView>
      <ChangePasswordModal
        visible={chagePassword}
        onClose={() => setChangePassword(false)}
        onSubmit={handleForgotPassword}
        showEmailInput={false}
      />
      <EmailVerificationModal
        visible={showVerifyModal}
        onClose={handleCloseModal}
        onResend={sendNewEmailVerification}
        user={user}
      />
      <EditProfileModal
        visible={isEditing}
        onClose={() => setIsEditing(false)}
      />
    </View>
  );
}
