import "dotenv/config";

export default {
  expo: {
    name: "silent-speak",
    slug: "silent-speak",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/silent_speak_favicon.png",
    scheme: "silentspeak",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    extra: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      eas: {
        projectId: "2708f4c6-bb3b-4bf3-beeb-ca932a4d4202",
      },
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.anonymous.silent-speak",
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
    },
    web: {
      output: "static",
      favicon: "./assets/images/silent_speak_favicon.png",
      backgroundColor: "#ffffff",
      themeColor: "#4630eb",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/silent_speak_icon.png",
          backgroundColor: "#ffffff",
          dark: {
            image: "./assets/images/silent_speak_icon_dark_mode.png",
            backgroundColor: "#545454",
          },
          imageWidth: 200,
          resizeMode: "contain",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
  },
};
