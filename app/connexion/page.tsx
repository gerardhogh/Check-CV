"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";
import { useAuth, UserRole } from "../context/AuthContext";
import GoogleAuthModal from "../components/GoogleAuthModal";

export default function ConnexionPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(true);
  const [tab, setTab] = useState<UserRole>("talent");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Veuillez renseigner votre email et mot de passe.");
      return;
    }

    setIsLoading(true);
    try {
      const ok = await login(email, tab);
      if (ok) {
        if (tab === "admin") {
          router.push("/dashboard/admin");
        } else if (tab === "recruteur") {
          router.push("/dashboard/recruteur");
        } else {
          router.push("/dashboard/talent");
        }
      }
    } catch (err) {
      setError("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{
        background:
          "linear-gradient(135deg, #bfe1f7 0%, #d8edf9 35%, #eae4f5 70%, #c9e4f7 100%)",
      }}
    >
      {/* Top nav with pill container matching Figma */}
      <header className="max-w-6xl w-full mx-auto px-6 py-6 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-90"
        >
          <div className="relative h-10 w-44">
            <Image
              src="/assets/CC blue png horiz 1.png"
              alt="Check CV Logo"
              fill
              priority
              className="object-contain object-left"
            />
          </div>
        </Link>
        <Link
          href="/connexion"
          className="px-6 py-2 rounded-full text-sm font-semibold border border-blue-500 text-blue-600 bg-white/80 hover:bg-white shadow-sm transition-all"
        >
          Connexion
        </Link>
      </header>

      {/* Center card matching admin_login.png */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-white/60 animate-fade-in-up">
          {/* Title */}
          <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-2">
            Connectez -vous
          </h1>
          <p className="text-center text-slate-400 text-sm mb-6">
            Accédez à votre espace personnel
          </p>

          {/* Role selector tabs */}
          <div className="flex gap-1.5 p-1 bg-slate-100 rounded-xl mb-6">
            {(["talent", "recruteur", "admin"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`flex-1 py-2 text-xs font-bold rounded-lg capitalize transition-all ${
                  tab === t
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {t === "admin"
                  ? "Admin"
                  : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-xs text-red-600">
              <AlertCircle size={16} className="flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Entrer l'e-mail"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  id="email-connexion"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 pr-11 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  id="password-connexion"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label="Afficher le mot de passe"
                >
                  {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="flex justify-end mt-1.5">
                <Link
                  href="/mot-de-passe-oublie"
                  className="text-xs font-medium text-red-500 hover:underline"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2.5 pt-1">
              <input
                type="checkbox"
                id="remember-me"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 accent-blue-600 cursor-pointer"
              />
              <label
                htmlFor="remember-me"
                className="text-xs text-slate-600 cursor-pointer font-medium select-none"
              >
                Rester connecté
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              id="btn-connexion"
              className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.99] transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 text-sm mt-3"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Connexion en cours...
                </>
              ) : (
                "Connexion"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-slate-400 text-xs font-medium">ou</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          {/* Google login button */}
          <button
            type="button"
            onClick={() => setIsGoogleModalOpen(true)}
            id="btn-google-connexion"
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:scale-[0.99] transition-all text-sm font-medium text-slate-700 shadow-sm"
          >
            <Image
              src="/assets/google 1.png"
              alt="Google Logo"
              width={18}
              height={18}
              className="object-contain"
            />
            Connexion avec Google
          </button>

          <p className="text-center text-xs text-slate-500 mt-6">
            Pas encore de compte ?{" "}
            <Link
              href="/inscription"
              className="font-bold text-blue-600 hover:underline"
            >
              Créer un compte
            </Link>
          </p>
        </div>
      </div>

      {/* Google Sign-in Modal */}
      <GoogleAuthModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
        defaultRole={tab}
        isSignUp={false}
      />
    </div>
  );
}
