import { NextAuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import crypto from "crypto";

declare module "next-auth" {
  interface User {
    id: string;
    role: string;
  }
  interface Session {
    user: User & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  adapter: undefined, 
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/connexion",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email et mot de passe requis");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { role: true }
        });

        if (!user || !user.passwordHash) {
          throw new Error("Utilisateur introuvable");
        }

        if (!user.active) {
          throw new Error("Ce compte est désactivé");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.passwordHash);

        if (!isPasswordValid) {
          throw new Error("Mot de passe incorrect");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role?.name || "GUEST",
        };
      }
    }),
    // Provider pour les utilisateurs authentifiés via Google/Supabase OAuth
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

        if (!user.active) {
          throw new Error("Ce compte est désactivé");
        }

        // Pas de vérification de mot de passe : l'identité a été validée par Supabase OAuth + jeton HMAC signé
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role?.name || "GUEST",
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
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    }
  },
};
