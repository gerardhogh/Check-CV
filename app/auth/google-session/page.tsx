"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { supabase } from "@/lib/supabase";

function GoogleSessionHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "talent";

  const [status, setStatus] = useState("Authentification Google en cours...");

  useEffect(() => {
    let mounted = true;

    const setupSession = async () => {
      try {
        // 1. Attendre que le client Supabase récupère/échange la session depuis l'URL
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !session) {
          console.error("Supabase session error:", sessionError);
          if (mounted) {
            setStatus("Erreur: Impossible de récupérer la session Google.");
            setTimeout(() => router.push("/connexion?error=SessionError"), 2000);
          }
          return;
        }

        if (mounted) setStatus("Synchronisation avec votre profil Check CV...");

        // 2. Envoyer le token au backend pour le sync (Prisma) et récupérer le HMAC
        const res = await fetch("/api/auth/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_token: session.access_token,
            roleParam: role,
          }),
        });

        let data: any = {};
        try {
          data = await res.json();
        } catch (e) {
          // Si la réponse n'est pas du JSON valide, on ignore
        }

        if (!res.ok) {
          throw new Error(data.error || "Erreur lors de la synchronisation backend");
        }

        if (mounted) setStatus("Connexion au tableau de bord...");

        // 3. Connecter NextAuth avec le token HMAC sécurisé
        const result = await signIn("google-oauth", {
          email: data.email,
          token: data.token,
          redirect: false,
        });

        if (result?.error) {
          console.error("NextAuth error:", result.error);
          if (mounted) {
            setStatus("Erreur lors de la création de la session finale.");
            setTimeout(() => router.push("/connexion?error=NextAuthError"), 2000);
          }
        } else {
          // Succès ! On redirige vers le dashboard
          if (mounted) {
            setStatus("Connexion réussie ! Redirection...");
            router.push(data.redirect || "/dashboard/talent");
          }
        }
      } catch (error: any) {
        console.error("Session setup error:", error);
        if (mounted) {
          setStatus("Erreur: " + (error?.message || "Une erreur est survenue"));
          setTimeout(() => router.push(`/connexion?error=${encodeURIComponent(error?.message || "ServerError")}`), 2000);
        }
      }
    };

    // On utilise un petit délai pour s'assurer que le hash fragment de l'URL
    // a été intercepté par Supabase
    const timer = setTimeout(() => {
      setupSession();
    }, 1000);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [router, role]);

  return (
    <div className="text-center">
      <div className="w-10 h-10 border-3 border-[#32A8D7] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-slate-600 font-medium">{status}</p>
    </div>
  );
}

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
