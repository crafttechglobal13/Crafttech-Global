"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "ADMIN" | "STAFF";
  phone?: string;
  image?: string;
  isVerified?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  googleLogin: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("crafttech_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // default customer session for seamless demo experience
        const defaultUser: User = {
          id: "usr_sarah_01",
          name: "Sarah Montgomery",
          email: "sarah.m@crafttechglobal.com",
          role: "CUSTOMER",
          phone: "+1 (555) 382-9012",
          image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
          isVerified: true,
        };
        setUser(defaultUser);
        localStorage.setItem("crafttech_user", JSON.stringify(defaultUser));
      }
    } catch (e) {
      console.error("Failed to load user session", e);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password?: string) => {
    setIsLoading(true);
    // Simulating authentication
    const cleanEmail = email.toLowerCase().trim();
    if (cleanEmail === "admin@crafttechglobal.com") {
      const adminUser: User = {
        id: "usr_admin_001",
        name: "CRAFTTECH Administrator",
        email: "admin@crafttechglobal.com",
        role: "ADMIN",
        phone: "+91 98765 43210",
        isVerified: true,
      };
      setUser(adminUser);
      localStorage.setItem("crafttech_user", JSON.stringify(adminUser));
      setIsLoading(false);
      return { success: true };
    }

    const customerUser: User = {
      id: "usr_cust_" + Date.now(),
      name: email.split("@")[0].replace(".", " ").toUpperCase(),
      email: cleanEmail,
      role: "CUSTOMER",
      phone: "+1 (555) 019-2834",
      isVerified: true,
    };
    setUser(customerUser);
    localStorage.setItem("crafttech_user", JSON.stringify(customerUser));
    setIsLoading(false);
    return { success: true };
  };

  const signup = async (name: string, email: string) => {
    setIsLoading(true);
    const newUser: User = {
      id: "usr_cust_" + Date.now(),
      name,
      email: email.toLowerCase().trim(),
      role: "CUSTOMER",
      isVerified: true,
    };
    setUser(newUser);
    localStorage.setItem("crafttech_user", JSON.stringify(newUser));
    setIsLoading(false);
    return { success: true };
  };

  const googleLogin = async () => {
    setIsLoading(true);
    const googleUser: User = {
      id: "usr_google_" + Date.now(),
      name: "Alexander Wright",
      email: "alexander.w@gmail.com",
      role: "CUSTOMER",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      isVerified: true,
    };
    setUser(googleUser);
    localStorage.setItem("crafttech_user", JSON.stringify(googleUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("crafttech_user");
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
        isAdmin,
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

