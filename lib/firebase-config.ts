// ============================================================================
// Code edited from:
// https://github.com/aaronksaunders/firebase-exporouter-app/blob/main/lib/firebase-config.ts
// ============================================================================
/**
 * Firebase configuration and initialization module.
 * This module handles the setup of Firebase services for the application.
 * @module
 */
// Import the functions you need from the SDKs you need
import Constants from "expo-constants";
// import { getAnalytics } from "firebase/analytics";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import {
  browserLocalPersistence,
  getAuth,
  // @ts-ignore
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import { Platform } from "react-native";

const apiKey = Constants.expoConfig?.extra?.FIREBASE_API_KEY;
if (!apiKey) {
  throw new Error("Missing FIREBASE_API_KEY");
}

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "silent-speak.firebaseapp.com",
  projectId: "silent-speak",
  storageBucket: "silent-speak.firebasestorage.app",
  messagingSenderId: "945883179598",
  appId: "1:945883179598:web:a0979a31055776e959f11f",
  measurementId: "G-0ZV7E008D2",
};

console.log(
  "Firebase key loaded:",
  !!Constants.expoConfig?.extra?.FIREBASE_API_KEY,
);

// Avoid re-initializing on hot reloads
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);

/**
 * Initialize Firebase Authentication service with platform-appropriate persistence.
 * - Web: uses browserLocalPersistence (localStorage)
 * - Native: uses getReactNativePersistence (AsyncStorage)
 */
const auth =
  getApps().length === 1
    ? initializeAuth(app, {
        persistence:
          Platform.OS === "web"
            ? browserLocalPersistence
            : getReactNativePersistence(ReactNativeAsyncStorage),
      })
    : getAuth(app);

export { auth, db };
export default app;
