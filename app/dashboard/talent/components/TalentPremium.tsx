"use client";

import { useState, useEffect, useRef } from "react";
import { CheckCircle, XCircle, Smartphone, CreditCard, ArrowLeft, CheckCheck, Clock } from "lucide-react";

type PayStep = "plan" | "method" | "input" | "processing" | "success";
type PayMethod = "mtn" | "moov" | "wave" | "card" | null;

const PAYMENT_METHODS = [
  { id: "mtn" as const, label: "MTN MoMo", color: "#FFCC00", textColor: "#1a1a1a", logo: "📱", description: "Mobile Money MTN" },
  { id: "moov" as const, label: "Moov Money", color: "#0057A8", textColor: "#ffffff", logo: "📱", description: "Mobile Money Moov" },
  { id: "wave" as const, label: "Wave", color: "#1EC4FF", textColor: "#ffffff", logo: "〰️", description: "Paiement Wave" },
  { id: "card" as const, label: "Carte bancaire", color: "#08304c", textColor: "#ffffff", logo: "💳", description: "CB / Visa / Mastercard" },
];

const COUNTRY_PREFIXES: Record<string, string> = {
  mtn: "+229",
  moov: "+229",
  wave: "+221",
  card: "",
};

export default function TalentPremium() {
  const [step, setStep] = useState<PayStep>("plan");
  const [method, setMethod] = useState<PayMethod>(null);
  const [phone, setPhone] = useState("");
  const [countdown, setCountdown] = useState(90);
  const [pollingDots, setPollingDots] = useState(".");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const dotsRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (step === "processing") {
      setCountdown(90);
      intervalRef.current = setInterval(() => {
        setCountdown((c) => {
          if (c <= 1) {
            clearInterval(intervalRef.current!);
            setStep("success");
            return 0;
          }
          return c - 1;
        });
      }, 1000);
      dotsRef.current = setInterval(() => {
        setPollingDots((d) => (d === "..." ? "." : d + "."));
      }, 500);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (dotsRef.current) clearInterval(dotsRef.current);
    };
  }, [step]);

  const selectedMethod = PAYMENT_METHODS.find((m) => m.id === method);
  const prefix = method ? COUNTRY_PREFIXES[method] : "";

  if (step === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-6 text-center animate-fade-in">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center animate-bounce-once">
            <CheckCheck size={44} className="text-green-500" />
          </div>
          <div className="absolute -top-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-ping-once">
            <CheckCircle size={20} className="text-white" />
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900 mb-2">Félicitations !</h3>
          <p className="text-slate-500 max-w-sm">
            Votre abonnement <strong>Talent Premium</strong> est activé. Profitez de tous vos avantages dès maintenant.
          </p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-2xl px-6 py-4 w-full max-w-sm space-y-2 text-left text-sm">
          <div className="flex justify-between"><span className="text-slate-500">Service</span><span className="font-bold">Abonnement Talent Premium</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Montant</span><span className="font-bold">700 FCFA</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Méthode</span><span className="font-bold">{selectedMethod?.label}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Statut</span><span className="font-bold text-green-600">✅ Réussi</span></div>
        </div>
        <button
          onClick={() => { setStep("plan"); setMethod(null); setPhone(""); }}
          className="w-full max-w-sm py-3 rounded-xl bg-[#008de4] hover:bg-blue-600 text-white font-bold text-sm transition-colors shadow-lg shadow-blue-500/20"
        >
          Passer l'entretien vidéo maintenant
        </button>
      </div>
    );
  }

  if (step === "processing") {
    const pct = Math.round(((90 - countdown) / 90) * 100);
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-8 text-center">
        <div className="relative w-28 h-28">
          <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" fill="none" stroke="#e2e8f0" strokeWidth="8" />
            <circle
              cx="50" cy="50" r="44" fill="none" stroke="#008de4" strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 44}`}
              strokeDashoffset={`${2 * Math.PI * 44 * (1 - pct / 100)}`}
              className="transition-all duration-1000"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Clock size={20} className="text-[#008de4] mb-0.5" />
            <span className="text-2xl font-black text-slate-900">{countdown}s</span>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">En attente de validation USSD{pollingDots}</h3>
          <p className="text-sm text-slate-500 max-w-sm">
            Une notification USSD a été envoyée à votre téléphone. Validez la demande de paiement pour continuer.
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className={`w-2.5 h-2.5 rounded-full bg-[#008de4] ${i < pollingDots.length ? "opacity-100" : "opacity-30"} transition-opacity duration-300`} />
            ))}
          </div>
          <p className="text-xs text-slate-400">Vérification toutes les 3 secondes</p>
        </div>
        <button
          onClick={() => setStep("input")}
          className="text-sm text-slate-400 hover:text-slate-600 underline"
        >
          Annuler et retour
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Steps breadcrumb */}
      {step !== "plan" && (
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => setStep(step === "input" ? "method" : "plan")}
            className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft size={16} /> Retour
          </button>
          <span className="text-slate-300">|</span>
          <span className="text-slate-400">
            {step === "method" ? "1. Sélection de la méthode" : "2. Saisie du numéro"}
          </span>
        </div>
      )}

      {/* STEP: Plan Overview */}
      {step === "plan" && (
        <div className="bg-white rounded-3xl p-8 shadow-xl max-w-4xl mx-auto border border-slate-100">
          <h2 className="text-2xl md:text-3xl font-black text-center text-[#005a82] mb-8">
            Devenez Talent Premium sur Check-CV
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gratuit */}
            <div className="rounded-2xl overflow-hidden border border-slate-100 bg-white flex flex-col shadow-sm">
              <div className="bg-[#006A9C] text-white text-center py-4 font-bold text-xl">Gratuit</div>
              <div className="p-8 text-center border-b border-slate-100 bg-slate-50/50">
                <div className="text-4xl font-black text-[#006A9C] mb-1 flex items-baseline justify-center gap-1">
                  0 CFA<span className="text-base font-normal text-slate-500">/gratuit</span>
                </div>
                <p className="text-sm text-slate-500 mt-2">Pour commencer à parcourir les avantages</p>
              </div>
              <div className="bg-[#006A9C] text-white text-center py-3 font-semibold text-sm">Version gratuite</div>
              <div className="p-6 flex-1">
                <ul className="space-y-4">
                  {["Possibilité de créer et compléter son profil", "Consultation d'offres d'emploi publiques", "Entretien vidéo automatisé", "Accès à la communauté exclusive WhatsApp", "Affiliation (Gagne de l'argent en parrainant !)"].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle size={18} className="text-[#006A9C] mt-0.5 flex-shrink-0" />{item}
                    </li>
                  ))}
                  {["Ajout de CV (Curriculum Vitae) en format PDF", "Visibilité accrue par des recruteurs sérieux", "Support technique rapide et disponible à plein temps."].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                      <XCircle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Premium */}
            <div className="rounded-2xl overflow-hidden border-2 border-[#51b6fc] bg-white flex flex-col shadow-lg shadow-blue-500/10 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wide">
                Recommandé
              </div>
              <div className="bg-[#51b6fc] text-white text-center py-4 font-bold text-xl flex items-center justify-center gap-2">
                <Smartphone size={20} /> Plan mensuel
              </div>
              <div className="p-8 text-center border-b border-slate-100 bg-slate-50/50">
                <div className="text-4xl font-black text-[#51b6fc] mb-1 flex items-baseline justify-center gap-1">
                  700 CFA<span className="text-base font-normal text-slate-500">/par mois</span>
                </div>
                <p className="text-sm text-slate-500 mt-2">Pour commencer à vous démarquer</p>
              </div>
              <button
                onClick={() => setStep("method")}
                className="bg-[#51b6fc] hover:bg-[#3ba8f5] text-white text-center py-3.5 font-bold text-sm transition-colors w-full shadow-md"
              >
                Sélectionner ce plan →
              </button>
              <div className="p-6 flex-1">
                <ul className="space-y-4">
                  {["Toutes les fonctionnalités du plan gratuit, plus", "Accès illimité aux offres d'emploi premium", "Visibilité accrue par des recruteurs sérieux", "Ajout de CV (Curriculum Vitae) en format PDF", "Entretien vidéo automatisé", "Support technique rapide et disponible à plein temps.", "Mise en relation directe avec certains recruteurs vérifiés"].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle size={18} className="text-[#51b6fc] mt-0.5 flex-shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 bg-slate-50 rounded-xl">
            <p className="text-center text-sm text-slate-600 pb-6 px-6">
              Paiement sécurisé via mobile money. Aucun engagement, résiliable à tout moment.
            </p>
          </div>
        </div>
      )}

      {/* STEP: Choose Method */}
      {step === "method" && (
        <div className="max-w-lg mx-auto space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-black text-slate-900">Choisissez votre méthode</h3>
            <p className="text-sm text-slate-500 mt-1">Sélectionnez un moyen de paiement pour votre abonnement à <strong>700 FCFA/mois</strong></p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {PAYMENT_METHODS.map((pm) => (
              <button
                key={pm.id}
                onClick={() => { setMethod(pm.id); setStep("input"); }}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl border-2 border-slate-100 hover:border-[#008de4] hover:shadow-lg hover:shadow-blue-500/10 transition-all bg-white"
              >
                <span className="text-3xl">{pm.logo}</span>
                <div>
                  <p className="font-bold text-sm text-slate-800">{pm.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{pm.description}</p>
                </div>
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: pm.color, color: pm.textColor }}
                >
                  {pm.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP: Enter Number */}
      {step === "input" && selectedMethod && (
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-black text-slate-900">Entrer votre numéro</h3>
            <p className="text-sm text-slate-500 mt-1">Paiement via <strong>{selectedMethod.label}</strong></p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-2">
                {method === "card" ? "Numéro de carte" : "Numéro de téléphone"}
              </label>
              {method !== "card" ? (
                <div className="flex gap-3">
                  <div className="flex items-center px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg font-bold text-sm text-slate-700 whitespace-nowrap">
                    {prefix}
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="01 23 45 67 89"
                    maxLength={12}
                    className="flex-1 bg-[#f8fafc] border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              ) : (
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="4111 1111 1111 1111"
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100"
                />
              )}
            </div>

            <div className="bg-slate-50 rounded-xl p-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Service</span><span className="font-bold">Abonnement Talent Premium</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Montant</span><span className="font-black text-[#008de4]">700 FCFA</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Méthode</span><span className="font-bold">{selectedMethod.label}</span></div>
            </div>

            <button
              disabled={phone.length < 8}
              onClick={() => setStep("processing")}
              className="w-full py-3.5 rounded-xl bg-[#008de4] hover:bg-blue-600 text-white font-bold text-sm transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Confirmer et payer 700 FCFA
            </button>
          </div>

          <p className="text-center text-xs text-slate-400">
            🔒 Paiement sécurisé. Vos données sont protégées.
          </p>
        </div>
      )}
    </div>
  );
}
