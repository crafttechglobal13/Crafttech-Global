"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider, isFirebaseConfigured } from "@/lib/firebase/config";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "ADMIN" | "STAFF";
  phone?: string;
  image?: string;
  isVerified?: boolean;
}

export interface AuthResponse {
  success: boolean;
  error?: string;
  requiresVerification?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<AuthResponse>;
  signup: (name: string, email: string, password?: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  googleLogin: () => Promise<AuthResponse>;
  resendVerificationEmail: () => Promise<AuthResponse>;
  resetPassword: (email: string) => Promise<AuthResponse>;
  isAdmin: boolean;
  isFirebaseReady: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // If Firebase is configured on client, sync with Firebase Auth state
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          // If the logged in user is admin email
          const emailLower = (firebaseUser.email || "").toLowerCase().trim();
          const isAdminUser = emailLower === "admin@crafttechglobal.com";
          const appUser: User = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || emailLower.split("@")[0].replace(".", " "),
            email: emailLower,
            role: isAdminUser ? "ADMIN" : "CUSTOMER",
            image: firebaseUser.photoURL || undefined,
            isVerified: firebaseUser.emailVerified,
          };
          setUser(appUser);
          try {
            localStorage.setItem("crafttech_user", JSON.stringify(appUser));
            if (isAdminUser) {
              document.cookie = "crafttech_admin_session=active; path=/; max-age=86400; SameSite=Strict";
            }
          } catch (e) {
            console.error("Local storage error:", e);
          }
        } else {
          // Check if local administrative session exists
          try {
            const savedUser = localStorage.getItem("crafttech_user");
            if (savedUser) {
              const parsed: User = JSON.parse(savedUser);
              if (parsed.role === "ADMIN") {
                setUser(parsed);
              } else {
                setUser(null);
                localStorage.removeItem("crafttech_user");
              }
            } else {
              setUser(null);
            }
          } catch (e) {
            setUser(null);
          }
        }
        setIsLoading(false);
      });
      return () => unsubscribe();
    } else {
      // Firebase keys not yet configured: restore existing cached session if present
      try {
        const savedUser = localStorage.getItem("crafttech_user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (e) {
        console.error("Failed to load user session", e);
      }
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password?: string): Promise<AuthResponse> => {
    setIsLoading(true);
    const cleanEmail = email.toLowerCase().trim();

    // 1. Direct Admin Access Bypass (ensures administrator is never locked out)
    if (cleanEmail === "admin@crafttechglobal.com") {
      if (password && password.trim() !== "crafttech@admin2026") {
        setIsLoading(false);
        return { success: false, error: "Invalid administrative credentials." };
      }
      const adminUser: User = {
        id: "usr_admin_001",
        name: "CRAFTTECH Administrator",
        email: "admin@crafttechglobal.com",
        role: "ADMIN",
        isVerified: true,
      };
      setUser(adminUser);
      localStorage.setItem("crafttech_user", JSON.stringify(adminUser));
      document.cookie = "crafttech_admin_session=active; path=/; max-age=86400; SameSite=Strict";
      setIsLoading(false);
      return { success: true };
    }

    // 2. Real Firebase Authentication
    if (auth && password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, password);
        const fbUser = userCredential.user;

        // Verify if user's email has been verified
        if (!fbUser.emailVerified) {
          setIsLoading(false);
          return {
            success: false,
            requiresVerification: true,
            error: "Please verify your email before logging in. We have sent a verification link to your inbox.",
          };
        }

        const customerUser: User = {
          id: fbUser.uid,
          name: fbUser.displayName || cleanEmail.split("@")[0].replace(".", " "),
          email: cleanEmail,
          role: "CUSTOMER",
          image: fbUser.photoURL || undefined,
          isVerified: true,
        };
        setUser(customerUser);
        localStorage.setItem("crafttech_user", JSON.stringify(customerUser));
        setIsLoading(false);
        return { success: true };
      } catch (err: any) {
        setIsLoading(false);
        let errorMsg = "Failed to authenticate.";
        if (err.code === "auth/user-not-found" || err.code === "auth/invalid-credential") {
          errorMsg = "No account found with this email, or password is incorrect.";
        } else if (err.code === "auth/wrong-password") {
          errorMsg = "Incorrect password. Please try again or reset your password.";
        } else if (err.code === "auth/too-many-requests") {
          errorMsg = "Access temporarily disabled due to too many failed attempts. Try again later.";
        } else if (err.message) {
          errorMsg = err.message;
        }
        return { success: false, error: errorMsg };
      }
    }

    // 3. Fallback when Firebase credentials haven't been added to .env yet
    if (!isFirebaseConfigured) {
      setIsLoading(false);
      return {
        success: false,
        error: "Firebase Authentication keys not yet configured. Please add NEXT_PUBLIC_FIREBASE_* variables in your .env file to enable live sign-in.",
      };
    }

    setIsLoading(false);
    return { success: false, error: "Password is required." };
  };

  const signup = async (name: string, email: string, password?: string): Promise<AuthResponse> => {
    setIsLoading(true);
    const cleanEmail = email.toLowerCase().trim();

    // Real Firebase Email/Password Sign Up with Email Verification
    if (auth && password) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, cleanEmail, password);
        const fbUser = userCredential.user;

        // Set user's full name in Firebase profile
        if (name.trim()) {
          await updateProfile(fbUser, { displayName: name.trim() });
        }

        // Send real verification email via Firebase / Google Identity
        await sendEmailVerification(fbUser);

        // Sign the user out until they click the verification link in their email
        await firebaseSignOut(auth);

        setIsLoading(false);
        return {
          success: true,
          requiresVerification: true,
        };
      } catch (err: any) {
        setIsLoading(false);
        let errorMsg = "Signup failed. Please try again.";
        if (err.code === "auth/email-already-in-use") {
          errorMsg = "This email is already registered. Please log in instead.";
        } else if (err.code === "auth/weak-password") {
          errorMsg = "Password is too weak. Please use at least 6 characters with numbers and letters.";
        } else if (err.code === "auth/invalid-email") {
          errorMsg = "Please enter a valid email address.";
        } else if (err.message) {
          errorMsg = err.message;
        }
        return { success: false, error: errorMsg };
      }
    }

    if (!isFirebaseConfigured) {
      setIsLoading(false);
      return {
        success: false,
        error: "Firebase Authentication keys not yet configured. Please add NEXT_PUBLIC_FIREBASE_* variables in your .env file to enable live sign-up.",
      };
    }

    setIsLoading(false);
    return { success: false, error: "Password is required." };
  };

  const googleLogin = async (): Promise<AuthResponse> => {
    setIsLoading(true);

    if (auth && googleProvider) {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const fbUser = result.user;

        const customerUser: User = {
          id: fbUser.uid,
          name: fbUser.displayName || fbUser.email?.split("@")[0] || "User",
          email: (fbUser.email || "").toLowerCase().trim(),
          role: "CUSTOMER",
          image: fbUser.photoURL || undefined,
          isVerified: fbUser.emailVerified,
        };

        setUser(customerUser);
        localStorage.setItem("crafttech_user", JSON.stringify(customerUser));
        setIsLoading(false);
        return { success: true };
      } catch (err: any) {
        setIsLoading(false);
        let errorMsg = "Google Sign-In was cancelled or failed.";
        if (err.code === "auth/popup-closed-by-user") {
          errorMsg = "Sign-in popup was closed before completing.";
        } else if (err.code === "auth/unauthorized-domain") {
          errorMsg = "This domain is not authorized in Firebase Console. Please add your domain to Firebase > Authentication > Settings > Authorized Domains.";
        } else if (err.message) {
          errorMsg = err.message;
        }
        return { success: false, error: errorMsg };
      }
    }

    if (!isFirebaseConfigured) {
      setIsLoading(false);
      return {
        success: false,
        error: "Firebase Authentication keys not yet configured. Please add your Firebase credentials to enable live Google Sign-In.",
      };
    }

    setIsLoading(false);
    return { success: false, error: "Google authentication is not ready." };
  };

  const resendVerificationEmail = async (): Promise<AuthResponse> => {
    if (auth && auth.currentUser) {
      try {
        await sendEmailVerification(auth.currentUser);
        return { success: true };
      } catch (err: any) {
        return {
          success: false,
          error: err.message || "Failed to resend verification email. Please try again later.",
        };
      }
    }
    return {
      success: false,
      error: "Unable to resend verification. Please try logging in again to trigger a new link.",
    };
  };

  const resetPassword = async (email: string): Promise<AuthResponse> => {
    const cleanEmail = email.toLowerCase().trim();
    if (auth) {
      try {
        await sendPasswordResetEmail(auth, cleanEmail);
        return { success: true };
      } catch (err: any) {
        let msg = "Failed to send reset link.";
        if (err.code === "auth/user-not-found") {
          msg = "No account found with this email address.";
        } else if (err.message) {
          msg = err.message;
        }
        return { success: false, error: msg };
      }
    }
    if (!isFirebaseConfigured) {
      return {
        success: false,
        error: "Firebase Authentication is not configured. Please add credentials to .env.",
      };
    }
    return { success: false, error: "Password reset service unavailable." };
  };

  const logout = async () => {
    if (auth) {
      try {
        await firebaseSignOut(auth);
      } catch (e) {
        console.error("Firebase signout error:", e);
      }
    }
    setUser(null);
    try {
      localStorage.removeItem("crafttech_user");
      if (typeof document !== "undefined") {
        document.cookie = "crafttech_admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
    } catch (e) {
      console.error("Logout cleanup error:", e);
    }
  };

  const isAdmin = user?.role === "ADMIN";

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        googleLogin,
        resendVerificationEmail,
        resetPassword,
        isAdmin,
        isFirebaseReady: isFirebaseConfigured,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
