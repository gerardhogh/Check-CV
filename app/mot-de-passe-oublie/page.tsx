"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Pass email as query param or store in state management. For now, simple routing.
      router.push(`/mot-de-passe-oublie/otp?email=${encodeURIComponent(email)}`);
    }, 1000);
  };

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{
        backgroundImage: "url('/assets/Fond.png')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      <Navbar variant="transparent" />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-slate-100 animate-fade-in-up">
          <h1 className="text-3xl font-extrabold text-center mb-2" style={{ color: "#32A8D7" }}>
            Mot de passe oublié ?
          </h1>
          <p className="text-center text-sm mb-8 text-slate-500 px-4">
            Entrer votre adresse e-mail pour recevoir le code de réinitialisation
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Email professionnel ou personnel
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Entrer l'e-mail"
                  className="w-full pl-10 pr-4 py-3 bg-[#F9FAFB] border-0 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#32A8D7] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !email}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-[#32A8D7] hover:bg-[#2a95c2] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99] transition-all shadow-md flex items-center justify-center gap-2 text-sm mt-4"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Envoi...
                </>
              ) : (
                "Recevoir le code"
              )}
            </button>
          </form>

          <div className="mt-6 flex justify-center">
            <Link
              href="/connexion"
              className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              <ArrowLeft size={16} /> Retour à la connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
