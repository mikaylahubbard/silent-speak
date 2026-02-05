// ============================================================================
// Code edited from:
// https://github.com/aaronksaunders/firebase-exporouter-app/blob/main/lib/firebase-service.ts
// ============================================================================

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    User,
    UserCredential,
} from "firebase/auth";

import { auth } from "./firebase-config";

// ========================================
// Types & Interfaces
// ========================================

export interface FirebaseUserResponse {
  user: User;
}

// ========================================
// Authentication services
// ========================================

export const getCurrentUser = async () => {
  try {
    return new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user ? { user } : null);
      });
    });
  } catch (error) {
    console.error("[error getting user] ==>", error);
    return null;
  }
};

export async function login(
  email: string,
  password: string,
): Promise<FirebaseUserResponse | undefined> {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return { user: userCredential.user };
  } catch (error) {
    console.error("[error loggin in] ==>", error);
    throw error;
  }
}

export async function logout(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("[error logging out] ==>", error);
    throw error;
  }
}

export async function register(
  email: string,
  password: string,
  name?: string,
): Promise<FirebaseUserResponse | undefined> {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    // optional field
    if (name) {
      await updateProfile(userCredential.user, { displayName: name });
    }
    return { user: userCredential.user };
  } catch (error) {
    console.error("[error registering] ==>", error);
    throw error;
  }
}
