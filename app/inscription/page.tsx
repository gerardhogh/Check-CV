"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Phone,
  Building2,
  Upload,
  AlertCircle,
  FileCheck,
} from "lucide-react";
import { useAuth, UserRole } from "../context/AuthContext";
import GoogleAuthModal from "../components/GoogleAuthModal";

function InscriptionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register } = useAuth();

  const defaultRole: UserRole =
    searchParams.get("type") === "recruteur" ? "recruteur" : "talent";

  const [role, setRole] = useState<UserRole>(defaultRole);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError(
        role === "recruteur"
          ? "Veuillez renseigner le nom de votre entreprise."
          : "Veuillez renseigner votre nom complet."
      );
      return;
    }
    if (!email.trim()) {
      setError("Veuillez renseigner votre adresse e-mail.");
      return;
    }
    if (!password.trim() || password.length < 6) {
      setError("Le mot de passe doit comporter au moins 6 caractères.");
      return;
    }
    if (!acceptTerms) {
      setError("Veuillez accepter les conditions d'utilisation.");
      return;
    }

    setIsLoading(true);
    try {
      const ok = await register({
        name,
        email,
        role,
        phone,
        company: role === "recruteur" ? name : undefined,
      });
      if (ok) {
        if (role === "recruteur") {
          router.push("/dashboard/recruteur");
        } else {
          router.push("/dashboard/talent");
        }
      }
    } catch (err) {
      setError("Erreur lors de la création de compte. Veuillez réessayer.");
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
      {/* Top nav */}
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

      {/* Main card */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-white/60 animate-fade-in-up">
          <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-2">
            Créer un compte
          </h1>
          <p className="text-center text-slate-400 text-sm mb-6">
            Rejoignez la plateforme Check CV dès aujourd'hui
          </p>

          {/* Role selector */}
          <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl mb-6">
            <button
              type="button"
              onClick={() => setRole("talent")}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                role === "talent"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              id="tab-talent"
            >
              Je suis un Talent
            </button>
            <button
              type="button"
              onClick={() => setRole("recruteur")}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                role === "recruteur"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              id="tab-recruteur"
            >
              Je suis un Recruteur
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-xs text-red-600">
              <AlertCircle size={16} className="flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nom complet ou Entreprise */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                {role === "recruteur" ? "Nom de l'entreprise" : "Nom complet"}
              </label>
              <div className="relative">
                {role === "recruteur" ? (
                  <Building2
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                ) : (
                  <User
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                )}
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={
                    role === "recruteur" ? "Ex: Grand-G Corp" : "Ex: Jules Kofi"
                  }
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  id="nom-complet"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Email professionnel ou personnel
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Entrer l'e-mail"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  id="email-inscription"
                />
              </div>
            </div>

            {/* Téléphone */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Téléphone (WhatsApp de préférence)
              </label>
              <div className="relative">
                <Phone
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+229 XX XX XX XX"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  id="telephone"
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Mot de passe
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="•••••••••••• (au moins 6 caractères)"
                  className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  id="password-inscription"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* CV upload for Talents */}
            {role === "talent" && (
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Votre CV <span className="text-slate-400">(optionnel)</span>
                </label>
                <label
                  htmlFor="cv-upload-input"
                  className="flex items-center gap-3 p-3.5 rounded-2xl border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 cursor-pointer transition-all"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                    {cvFile ? <FileCheck size={18} /> : <Upload size={18} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-700 truncate">
                      {cvFile ? cvFile.name : "Glissez votre CV ici (.PDF, .DOC)"}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Taille maximale : 10 Mo
                    </p>
                  </div>
                </label>
                <input
                  type="file"
                  id="cv-upload-input"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setCvFile(e.target.files[0]);
                    }
                  }}
                />
              </div>
            )}

            {/* Referral code */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Code de parrainage{" "}
                <span className="text-slate-400 font-normal">(optionnel)</span>
              </label>
              <input
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                placeholder="Ex: CC-XXXX"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                id="code-parrainage"
              />
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start gap-2.5 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 accent-blue-600 cursor-pointer"
              />
              <label
                htmlFor="terms"
                className="text-xs text-slate-500 leading-relaxed cursor-pointer select-none"
              >
                J'accepte les{" "}
                <Link
                  href="/conditions"
                  className="text-blue-600 font-medium hover:underline"
                >
                  conditions d'utilisation
                </Link>{" "}
                et la{" "}
                <Link
                  href="/confidentialite"
                  className="text-blue-600 font-medium hover:underline"
                >
                  politique de confidentialité
                </Link>
                .
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              id="btn-creer-compte"
              className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.99] transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 text-sm mt-3"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Création en cours...
                </>
              ) : (
                "Créer mon compte"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-slate-400 text-xs font-medium">ou</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          {/* Google Sign up button */}
          <button
            type="button"
            onClick={() => setIsGoogleModalOpen(true)}
            id="btn-google-inscription"
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:scale-[0.99] transition-all text-sm font-medium text-slate-700 shadow-sm"
          >
            <Image
              src="/assets/google 1.png"
              alt="Google Logo"
              width={18}
              height={18}
              className="object-contain"
            />
            S'inscrire avec Google
          </button>

          <p className="text-center text-xs text-slate-500 mt-6">
            Déjà inscrit ?{" "}
            <Link
              href="/connexion"
              className="font-bold text-blue-600 hover:underline"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </div>

      {/* Google Modal */}
      <GoogleAuthModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
        defaultRole={role}
        isSignUp={true}
      />
    </div>
  );
}

export default function InscriptionPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <InscriptionForm />
    </Suspense>
  );
}
