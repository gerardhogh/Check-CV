import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import crypto from "crypto";

// Extension des types TypeScript de NextAuth pour inclure 'id' et 'role'
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      role?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
  interface User {
    id?: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
  }
}

// Sécurité : Bloquer le démarrage si le secret est absent
if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("⚠️ La variable d'environnement NEXTAUTH_SECRET est manquante dans .env");
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    // Authentification Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),

    // Authentification classique (Email + Mot de passe)
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email et mot de passe requis");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { role: true },
        });

        if (!user || !user.passwordHash) {
          throw new Error("Utilisateur non trouvé ou compte incorrect");
        }

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);

        if (!isValid) {
          throw new Error("Mot de passe incorrect");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role?.name || "TALENT",
        };
      },
    }),
      // Authentification Google OAuth par Supabase
    CredentialsProvider({
      id: "google-oauth",
      name: "Google OAuth",
      credentials: {
        email: { label: "Email", type: "email" },
        token: { label: "Token", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.token) {
          throw new Error("Paramètres manquants");
        }

        const [timestampStr, signature] = credentials.token.split(":");
        if (!timestampStr || !signature) {
          throw new Error("Token malformé");
        }

        const timestamp = Number(timestampStr);
        if (isNaN(timestamp) || Date.now() - timestamp > 5 * 60 * 1000) {
          throw new Error("Session expirée, veuillez vous reconnecter");
        }

        const secret = process.env.NEXTAUTH_SECRET || "fallback-secret";
        const expectedSignature = crypto
          .createHmac("sha256", secret)
          .update(`${credentials.email}:${timestampStr}`)
          .digest("hex");

        if (signature !== expectedSignature) {
          throw new Error("Signature invalide");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { role: true },
        });

        if (!user) {
          throw new Error("Utilisateur introuvable");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role?.name || "TALENT",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/connexion",
  },
};