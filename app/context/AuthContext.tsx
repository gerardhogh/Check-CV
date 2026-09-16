"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export type UserRole = "talent" | "recruteur" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  company?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, role?: UserRole, name?: string) => Promise<boolean>;
  loginWithGoogle: (role?: UserRole, googleUser?: Partial<User>) => Promise<boolean>;
  register: (data: {
    name: string;
    email: string;
    role: UserRole;
    phone?: string;
    company?: string;
  }) => Promise<boolean>;
  updateUser: (data: Partial<User>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("check_cv_user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load user from localStorage", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveUserSession = (userData: User) => {
    setUser(userData);
    localStorage.setItem("check_cv_user", JSON.stringify(userData));
  };

  const login = async (email: string, role: UserRole = "talent", name?: string): Promise<boolean> => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    let defaultName = name;
    if (!defaultName) {
      if (role === "admin") defaultName = "Super Admin";
      else if (role === "recruteur") defaultName = "Grand-G Corp";
      else defaultName = "Jules Kofi";
    }

    const newUser: User = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      name: defaultName,
      email,
      role,
      avatar: "/assets/Avatar ByeWind.png",
      company: role === "recruteur" ? defaultName : undefined,
    };

    saveUserSession(newUser);
    setLoading(false);
    return true;
  };

  const loginWithGoogle = async (
    role: UserRole = "talent",
    googleUser?: Partial<User>
  ): Promise<boolean> => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const finalName = googleUser?.name || (role === "recruteur" ? "Grand-G Corp" : "Jules Kofi");
    const finalEmail = googleUser?.email || "jules.kofi@gmail.com";

    const newUser: User = {
      id: "goog_" + Math.random().toString(36).substring(2, 9),
      name: finalName,
      email: finalEmail,
      role,
      avatar: "/assets/Avatar ByeWind.png",
      company: role === "recruteur" ? finalName : undefined,
    };

    saveUserSession(newUser);
    setLoading(false);
    return true;
  };

  const register = async (data: {
    name: string;
    email: string;
    role: UserRole;
    phone?: string;
    company?: string;
  }): Promise<boolean> => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    const newUser: User = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      name: data.name,
      email: data.email,
      role: data.role,
      avatar: "/assets/Avatar ByeWind.png",
      phone: data.phone,
      company: data.company || (data.role === "recruteur" ? data.name : undefined),
    };

    saveUserSession(newUser);
    setLoading(false);
    return true;
  };

  const updateUser = (data: Partial<User>) => {
    if (!user) return;
    const updatedUser: User = { ...user, ...data };
    saveUserSession(updatedUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("check_cv_user");
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        loginWithGoogle,
        register,
        updateUser,
        logout,
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
