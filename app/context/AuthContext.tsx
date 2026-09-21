"use client";

import { useSession, signOut } from "next-auth/react";
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

// Fonction utilitaire pour migrer en douceur toutes les utilisations de useAuth
export function useAuth() {
  const { data: session, status } = useSession();

  const user = session?.user
    ? {
        id: session.user.id || "",
        name: session.user.name || "",
        email: session.user.email || "",
        role: (session.user.role as UserRole) || "talent",
        avatar: session.user.image || "/assets/Avatar ByeWind.png",
      }
    : null;

  const logout = () => {
    signOut({ callbackUrl: "/connexion" });
  };

  return {
    user,
    loading: status === "loading",
    logout,
    // Méthodes de compatibilité (non utilisées maintenant que /api/register gère ça)
    login: async () => false,
    loginWithGoogle: async () => false,
    register: async () => false,
    updateUser: () => {},
  };
}

// Dummy provider pour éviter les erreurs d'import s'il reste des références
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
