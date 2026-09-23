"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { supabase } from "@/lib/supabase";

function GoogleSessionHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "talent";

  useEffect(() => {
    let mounted = true;

    const setupSession = async () => {
      try {
        // 1. Attendre que le client Supabase récupère/échange la session depuis l'URL
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !session) {
          console.error("Supabase session error:", sessionError);
          if (mounted) {
            router.push("/connexion?error=SessionError");
          }
          return;
        }

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

        // 3. Connecter NextAuth avec le token HMAC sécurisé
        const result = await signIn("google-oauth", {
          email: data.email,
          token: data.token,
          redirect: false,
        });

        if (result?.error) {
          console.error("NextAuth error:", result.error);
          if (mounted) {
            router.push("/connexion?error=NextAuthError");
          }
        } else {
          // Succès ! On redirige vers le dashboard
          if (mounted) {
            router.push(data.redirect || "/dashboard/talent");
          }
        }
      } catch (error: any) {
        console.error("Session setup error:", error);
        if (mounted) {
          router.push(`/connexion?error=${encodeURIComponent(error?.message || "ServerError")}`);
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
      <p className="text-slate-600 font-medium">Veuillez patienter...</p>
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
            <p className="text-slate-600 font-medium">Veuillez patienter...</p>
          </div>
        }
      >
        <GoogleSessionHandler />
      </Suspense>
    </div>
  );
}
