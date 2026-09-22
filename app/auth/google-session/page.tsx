"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

/**
 * Logique de création de session NextAuth après Supabase OAuth.
 */
function GoogleSessionHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("Connexion en cours...");

  useEffect(() => {
    const email = searchParams.get("email");
    const token = searchParams.get("token");
    const redirect = searchParams.get("redirect") || "/dashboard/talent";

    if (!email || !token) {
      setStatus("Erreur: paramètres de session manquants");
      setTimeout(() => router.push("/connexion?error=MissingParams"), 2000);
      return;
    }

    const createSession = async () => {
      try {
        const result = await signIn("google-oauth", {
          email,
          token,
          redirect: false,
        });

        if (result?.error) {
          console.error("NextAuth sign-in error:", result.error);
          setStatus("Erreur de session. Redirection...");
          setTimeout(() => router.push("/connexion?error=SessionError"), 2000);
        } else {
          setStatus("Connexion réussie ! Redirection...");
          router.push(redirect);
        }
      } catch (error) {
        console.error("Session creation error:", error);
        setStatus("Erreur inattendue");
        setTimeout(() => router.push("/connexion?error=UnexpectedError"), 2000);
      }
    };

    createSession();
  }, [searchParams, router]);

  return (
    <div className="text-center">
      <div className="w-10 h-10 border-3 border-[#32A8D7] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-slate-600 font-medium">{status}</p>
    </div>
  );
}

/**
 * Page intermédiaire après le callback OAuth Supabase.
 * Enveloppée dans Suspense pour respecter les conventions Next.js App Router.
 */
export default function GoogleSessionPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Suspense
        fallback={
          <div className="text-center">
            <div className="w-10 h-10 border-3 border-[#32A8D7] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600 font-medium">Chargement...</p>
          </div>
        }
      >
        <GoogleSessionHandler />
      </Suspense>
    </div>
  );
}

