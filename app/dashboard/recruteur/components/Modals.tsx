"use client";

import { ReactNode } from "react";

// ─── Generic Confirmation Modal ───────────────────────────────────────────────
interface ConfirmModalProps {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  isDanger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  children?: ReactNode;
}

export function ConfirmModal({
  title,
  message,
  confirmLabel,
  cancelLabel = "Non, continuer",
  isDanger = false,
  onConfirm,
  onCancel,
  children,
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-sm p-7 flex flex-col gap-5">
        <div className="text-center">
          <h2 className="text-lg font-extrabold text-slate-900 mb-2">{title}</h2>
          <p className="text-sm text-slate-500 leading-relaxed">{message}</p>
        </div>
        {children}
        <div className="flex gap-3 mt-1">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-2.5 rounded-xl text-white text-sm font-semibold shadow-sm transition-colors ${
              isDanger
                ? "bg-red-500 hover:bg-red-600"
                : "bg-[#32A8D7] hover:bg-[#2896c2]"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Success Modal ("Offre publiée") ─────────────────────────────────────────
interface SuccessModalProps {
  title: string;
  message: string;
  primaryLabel: string;
  secondaryLabel?: string;
  onPrimary: () => void;
  onSecondary?: () => void;
}

export function SuccessModal({
  title,
  message,
  primaryLabel,
  secondaryLabel = "Retour",
  onPrimary,
  onSecondary,
}: SuccessModalProps) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-sm p-7 flex flex-col gap-5 items-center text-center">
        {/* Green check circle */}
        <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} className="w-8 h-8">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 mb-2">{title}</h2>
          <p className="text-sm text-slate-500">{message}</p>
        </div>
        <div className="flex gap-3 w-full mt-1">
          {onSecondary && (
            <button
              onClick={onSecondary}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              {secondaryLabel}
            </button>
          )}
          <button
            onClick={onPrimary}
            className="flex-1 py-2.5 rounded-xl bg-[#32A8D7] hover:bg-[#2896c2] text-white text-sm font-semibold shadow-sm transition-colors"
          >
            {primaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Désactivation Modal (with reason selector) ───────────────────────────────
interface DeactivateModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeactivateModal({ onCancel, onConfirm }: DeactivateModalProps) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-sm p-7 flex flex-col gap-5">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 mb-2">Confirmer la désactivation</h2>
          <p className="text-sm text-slate-500 mb-4">Veuillez sélectionner la raison de votre désactivation :</p>
          <div className="relative">
            <select className="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-500 outline-none focus:border-[#32A8D7] focus:bg-white transition-colors cursor-pointer">
              <option value="">Choisis la raison</option>
              <option>Je n&apos;ai plus besoin du service</option>
              <option>J&apos;ai trouvé une autre solution</option>
              <option>Le service ne correspond pas à mes besoins</option>
              <option>Problème technique</option>
              <option>Autre raison</option>
            </select>
            <svg className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold shadow-sm transition-colors"
          >
            Désactiver mon compte
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Logout Modal ─────────────────────────────────────────────────────────────
interface LogoutModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export function LogoutModal({ onCancel, onConfirm }: LogoutModalProps) {
  return (
    <ConfirmModal
      title="Déconnexion"
      message="Vous êtes sur le point de vous déconnecter"
      confirmLabel="Se déconnecter"
      cancelLabel="Annuler"
      isDanger={true}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}
