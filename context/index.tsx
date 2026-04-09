// ============================================================================
// The following code is edited from
// https://github.com/aaronksaunders/firebase-exporouter-app/blob/main/context/index.tsx
// ============================================================================

/**
 * Authentication context module providing global auth state and methods.
 * @module
 */

// ============================================================================
// Imports
// ============================================================================

import { auth, db } from "@/lib/firebase-config";
import { login, logout, register } from "@/lib/firebase-service";
import { MODES, PALETTES } from "@/theme/colorThemes";
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
  getDocs,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
  modePalette: typeof MODES.light;
  mode: "light" | "dark";
  switchMode: () => Promise<void>;
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
  // ============================================================================
  // State & Hooks
  // ============================================================================

  const [error, setError] = useState<string | null>(null);
  const clearError = () => setError(null);

  /**
   * Current authenticated user state
   * @type {[User | null, React.Dispatch<React.SetStateAction<User | null>>]}
   */
  /**
   * Loading state for authentication operations
   * @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]}
   */
  const [user, setUser] = useState<User | null>(null);
  const [userDoc, setUserDoc] = useState<any | null>(null);
  const [cards, setCards] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const unsubscribeCardsRef = useRef<(() => void) | null>(null);
  const activeUserRef = useRef<string | null>(null);

  const isInitializingRef = useRef(false);
  const sessionInitializedRef = useRef(false);

  // ============================================================================
  // Firestore Helpers (listeners)
  // ============================================================================

  //find the user documents in the database
  const ensureUserDocument = async (firebaseUser: User, name?: string) => {
    if (isInitializingRef.current) return; // prevent duplicate runs
    isInitializingRef.current = true;

    try {
      const userRef = doc(db, "users", firebaseUser.uid);
      const snapshot = await getDoc(userRef);

      console.log("name: :", firebaseUser.displayName ?? "user");

      if (!snapshot.exists()) {
        await setDoc(
          userRef,
          defaultUserDocument(
            firebaseUser,
            name ?? firebaseUser.displayName ?? "User",
          ),
        );

        const cardsRef = collection(userRef, "cards");

        const cardsSnapshot = await getDocs(cardsRef);

        if (!cardsSnapshot.empty) return;

        for (const card of defaultCards()) {
          await addDoc(cardsRef, {
            ...card,
            createdAt: serverTimestamp(),
          });
        }
      }
    } finally {
      isInitializingRef.current = false;
    }
  };

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

  // ============================================================================
  // Initialize Session - this is to make things a bit clearer
  // ============================================================================

  const initializeSession = async (firebaseUser: User) => {
    await ensureUserDocument(firebaseUser);
    await setUserDocument(firebaseUser.uid);
  };

  // ============================================================================
  // Effects
  // ============================================================================

  // ============================================================================
  // Auth Effect
  // ============================================================================

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const uid = firebaseUser.uid;
        activeUserRef.current = uid;

        await firebaseUser.reload();
        setUser(firebaseUser);

        //checks

        if (activeUserRef.current !== uid) {
          setIsLoading(false);
          return;
        }
        if (!sessionInitializedRef.current) {
          await initializeSession(firebaseUser);
        }
        if (activeUserRef.current !== uid) {
          setIsLoading(false);
          return;
        }
        sessionInitializedRef.current = false;
      } else {
        activeUserRef.current = null;
        setUser(null);
        setUserDoc(null);
        setCards([]);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ============================================================================
  // Cards Listener Effect
  // ============================================================================

  useEffect(() => {
    if (!user) {
      if (unsubscribeCardsRef.current) {
        unsubscribeCardsRef.current();
        unsubscribeCardsRef.current = null;
      }
      return;
    }

    const cardsRef = collection(db, "users", user.uid, "cards");

    if (unsubscribeCardsRef.current) {
      unsubscribeCardsRef.current();
    }

    const currentUid = user.uid;

    const unsubscribe = onSnapshot(
      cardsRef,
      (snapshot) => {
        // check for stale updates
        if (activeUserRef.current !== currentUid) return;
        const cardsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCards(cardsData);
      },
      (error) => {
        // Ignore logout-related errors: these are expected at times
        if (error.code === "permission-denied") {
          return;
        }
        console.error("Cards listener error:", error);
      },
    );

    unsubscribeCardsRef.current = unsubscribe;

    return () => unsubscribe();
  }, [user]);

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
      if (response?.user) {
        await response.user.getIdToken(true);
        sessionInitializedRef.current = true;
        await initializeSession(response.user);
      }
      return response?.user;
    } catch (error: any) {
      sessionInitializedRef.current = false;
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

      if (response?.user) {
        // force-refresh the token
        await response.user.getIdToken(true);
        sessionInitializedRef.current = true; // block the listener
        await ensureUserDocument(response.user, name);
        isInitializingRef.current = false; // ensure clean state before logout
        await logout();
      }
      return response?.user;
    } catch (error: any) {
      sessionInitializedRef.current = false;
      isInitializingRef.current = false;
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
      // stop listener
      unsubscribeCardsRef.current?.();
      unsubscribeCardsRef.current = null;
      isInitializingRef.current = false;

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

  const mode: "light" | "dark" = userDoc?.settings?.theme ?? "light";
  const modePalette = MODES[mode];

  const switchMode = async () => {
    if (!user) {
      throw new Error("User not authenticated");
    }
    const newMode = mode === "light" ? "dark" : "light";
    const userRef = doc(db, "users", user.uid);

    setUserDoc((prev: { settings: any }) => ({
      ...prev,
      settings: {
        ...prev.settings,
        theme: newMode,
      },
    }));

    await updateDoc(userRef, {
      "settings.theme": newMode,
    });
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
        modePalette,
        mode,
        switchMode,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// function sendPasswordResetEmail(auth: Auth, email: string) {
//   throw new Error("Function not implemented.");
// }
