// ============================================================================
// The following code is edited from
// https://github.com/aaronksaunders/firebase-exporouter-app/blob/main/context/index.tsx
// ============================================================================

/**
 * Authentication context module providing global auth state and methods.
 * @module
 */

import { auth, db } from "@/lib/firebase-config";
import { login, logout, register } from "@/lib/firebase-service";
import { PALETTES } from "@/theme/colorThemes";
import {
  User,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { defaultCards, defaultUserDocument } from "../lib/user-templates";

// ============================================================================
// Types & Interfaces
// ============================================================================

/**
 * Authentication context interface defining available methods and state
 * for managing user authentication throughout the application.
 * @interface
 */
interface AuthContextType {
  /**
   * Authenticates an existing user with their credentials
   * @param {string} email - User's email address
   * @param {string} password - User's password
   * @returns {Promise<User | undefined>} Authenticated user or undefined
   */
  signIn: (email: string, password: string) => Promise<User | undefined>;

  /**
   * Creates and authenticates a new user account
   * @param {string} email - User's email address
   * @param {string} password - User's password
   * @param {string} [name] - Optional user's display name
   * @returns {Promise<User | undefined>} Created user or undefined
   */
  signUp: (
    email: string,
    password: string,
    name?: string,
  ) => Promise<User | undefined>;

  /**
   * Logs out the current user and clears session
   * @returns {void}
   */
  signOut: () => void;

  /** Currently authenticated user */
  user: User | null;
  userDoc: any | null;
  cards: any | null;
  addCard: (title: string, message: string) => void;
  deleteCard: (id: string) => void;
  editCard: (title: string, description: string, id: string) => void;
  editProfile: (username: string, phoneNumber: string, age: string) => void;
  handleForgotPassword: () => void;
  /** Loading state for authentication operations */
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
  sendNewEmailVerification: (user: User) => void;
  palette: typeof PALETTES.violet;
  themeName: string;
  setTheme: (theme: string) => Promise<void>;
}

// ============================================================================
// Context Creation
// ============================================================================

/**
 * Authentication context instance
 * @type {React.Context<AuthContextType>}
 */
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// ============================================================================
// Hook
// ============================================================================

/**
 * Custom hook to access authentication context
 * @returns {AuthContextType} Authentication context value
 * @throws {Error} If used outside of AuthProvider
 */
export function useSession(): AuthContextType {
  const value = useContext(AuthContext);

  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

// ============================================================================
// Provider Component
// ============================================================================

/**
 * SessionProvider component that manages authentication state
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Provider component
 */

export function SessionProvider(props: { children: React.ReactNode }) {
  //find the user documents in the database
  const ensureUserDocument = async (firebaseUser: User) => {
    const userRef = doc(db, "users", firebaseUser.uid);
    const snapshot = await getDoc(userRef);

    console.log("name: :", firebaseUser.displayName ?? "user");

    if (!snapshot.exists()) {
      await setDoc(
        userRef,
        defaultUserDocument(firebaseUser, firebaseUser.displayName ?? "User"),
      );

      const cardsRef = collection(userRef, "cards");

      const cardsSnapshot = await getDoc(doc(db, "users", firebaseUser.uid));

      for (const card of defaultCards()) {
        await addDoc(cardsRef, {
          ...card,
          createdAt: serverTimestamp(),
        });
      }
    }
  };

  const [error, setError] = useState<string | null>(null);
  const clearError = () => setError(null);
  // ============================================================================
  // State & Hooks
  // ============================================================================

  /**
   * Current authenticated user state
   * @type {[User | null, React.Dispatch<React.SetStateAction<User | null>>]}
   */
  const [user, setUser] = useState<User | null>(null);
  const [userDoc, setUserDoc] = useState<any | null>(null);
  const [cards, setCards] = useState<any[]>([]);

  const setUserDocument = async (uid: string) => {
    try {
      const userRef = doc(db, "users", uid);
      const snapshot = await getDoc(userRef);

      if (snapshot.exists()) {
        setUserDoc(snapshot.data());
      }
    } catch (error) {
      console.error("Error fetching user document:", error);
    }
  };
  let unsubscribeCards: (() => void) | null = null;
  const setUserCards = (uid: string) => {
    const cardsRef = collection(db, "users", uid, "cards");

    unsubscribeCards = onSnapshot(cardsRef, (snapshot) => {
      const cardsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCards(cardsData);
    });
  };

  /**
   * Loading state for authentication operations
   * @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]}
   */
  const [isLoading, setIsLoading] = useState(true);

  // ============================================================================
  // Effects
  // ============================================================================

  /**
   * Sets up Firebase authentication state listener
   * Automatically updates user state on auth changes
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        await ensureUserDocument(firebaseUser);
        await setUserDocument(firebaseUser.uid);
        await setUserCards(firebaseUser.uid);

        setIsLoading(false);
      } else {
        setUser(null);
        setCards([]);

        if (unsubscribeCards) {
          unsubscribeCards();
          unsubscribeCards = null;
        }
        setIsLoading(false);
      }
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();

      if (unsubscribeCards) {
        unsubscribeCards();
      }
    };
  }, []);

  // ============================================================================
  // Handlers
  // ============================================================================

  /**
   * Handles user sign-in process
   * @param {string} email - User's email address
   * @param {string} password - User's password
   * @returns {Promise<User | undefined>} Authenticated user or undefined
   */
  const handleSignIn = async (email: string, password: string) => {
    try {
      const response = await login(email, password);
      await response?.user.reload();
      return response?.user;
    } catch (error: any) {
      console.error("[handleSignIn error] ==>", error);

      switch (error.code) {
        case "auth/invalid-credential":
        case "auth/user-not-found":
        case "auth/wrong-password":
          setError("Invalid email or password.");
          break;
        default:
          setError("Something went wrong. Please try again.");
      }
      return undefined;
    }
  };

  /**
   * Handles new user registration process
   * @param {string} email - User's email address
   * @param {string} password - User's password
   * @param {string} [name] - Optional user's display name
   * @returns {Promise<User | undefined>} Created user or undefined
   */

  const handleSignUp = async (
    email: string,
    password: string,
    name?: string,
  ) => {
    try {
      setError(null);
      const response = await register(email, password, name);
      // if (response?.user) {
      //   // Pass 'name' explicitly to ensure the DB record gets it
      //   await ensureUserDocument(response.user, name);
      // }
      return response?.user;
    } catch (error: any) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("Email already in use. Please try again.");
          break;
        case "auth/weak-password":
          setError("Password must be at least 6 characters. Please try again.");
          break;
        default:
          setError("Something went wrong. Please try again.");
      }
      return undefined;
    }
  };

  /**
   * Handles user sign-out process
   * Clears local user state after successful logout
   */
  const handleSignOut = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error("[handleSignOut error] ==>", error);
    }
  };

  const addCard = async (title: string, message: string) => {
    if (!user) {
      throw new Error("User not authenticated");
    }

    const newCard = { title, description: message };
    try {
      const cardsRef = collection(db, "users", user.uid, "cards");

      const docRef = await addDoc(cardsRef, {
        ...newCard,
        createdAt: serverTimestamp(),
      });

      // setCards((prev: any) => [...prev, { ...newCard, id: docRef.id }]);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const deleteCard = async (id: string) => {
    if (!user) {
      throw new Error("User not authenticated");
    }
    try {
      const cardRef = doc(db, "users", user.uid, "cards", id);
      await deleteDoc(cardRef);
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  const editCard = async (title: string, description: string, id: string) => {
    console.log("EDITING CARD:", { title, description, id });
    if (!user) {
      throw new Error("User not authenticated");
    }
    try {
      const cardRef = doc(db, "users", user.uid, "cards", id);
      await updateDoc(cardRef, {
        title: title,
        description: description,
        editedAt: new Date(),
      });
    } catch (e) {
      console.error("Error editing document: ", e);
    }
  };

  const editProfile = async (
    username: string,
    phoneNumber: string,
    age: string,
  ) => {
    console.log("editing profile");
    if (!user) {
      throw new Error("User not authenticated");
    }
    const userRef = doc(db, "users", user.uid);
    console.log(userRef);
    await updateDoc(userRef, {
      "profile.name": username,
      "profile.phoneNumber": phoneNumber,
      "profile.age": age,
    });
    setUserDoc((prev: { profile: any }) => ({
      ...prev,
      profile: {
        ...prev.profile,
        name: username,
        phoneNumber: phoneNumber,
        age: age,
      },
    }));
  };

  const handleForgotPassword = async (email?: string) => {
    let emailToUse: string = "";
    // user is not logged in
    if (!user) {
      if (email) {
        emailToUse = email.trim().toLowerCase();
      }
    } else {
      // user is logged in
      if (user.email) {
        emailToUse = user.email;
      }
    }
    if (emailToUse !== "") {
      try {
        await sendPasswordResetEmail(auth, emailToUse);
        console.log("Trying email:", emailToUse);
      } catch (e) {
        console.error("Error sending password reset: ", e);
      }
    } else {
      console.error("Error getting email.");
    }
  };

  const sendNewEmailVerification = async (user: User) => {
    await sendEmailVerification(user);
  };

  // Theme colors
  const themeName: keyof typeof PALETTES =
    userDoc?.settings?.colorTheme ?? "violet";
  const palette = PALETTES[themeName] ?? PALETTES["violet"];

  const setTheme = async (newTheme: string) => {
    if (!user) {
      throw new Error("User not authenticated");
    }
    const userRef = doc(db, "users", user.uid);
    console.log(userRef);
    await updateDoc(userRef, {
      "settings.colorTheme": newTheme,
    });

    setUserDoc((prev: { settings: any }) => ({
      ...prev,
      settings: {
        ...prev.settings,
        colorTheme: newTheme,
      },
    }));
  };

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <AuthContext.Provider
      value={{
        signIn: handleSignIn,
        signUp: handleSignUp,
        signOut: handleSignOut,
        user,
        userDoc,
        cards,
        addCard,
        deleteCard,
        editCard,
        editProfile,
        handleForgotPassword,
        isLoading,
        error,
        clearError,
        sendNewEmailVerification,
        palette,
        themeName,
        setTheme,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// function sendPasswordResetEmail(auth: Auth, email: string) {
//   throw new Error("Function not implemented.");
// }
