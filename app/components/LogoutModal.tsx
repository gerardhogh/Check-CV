"use client";

import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface LogoutModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({ onCancel, onConfirm }: LogoutModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-sm p-7 flex flex-col gap-5 text-center mx-auto relative animate-fade-in">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto shadow-sm border border-red-100">
          <LogOut className="w-8 h-8 text-red-500 ml-1" />
        </div>
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 mb-2">Déconnexion</h2>
          <p className="text-sm text-slate-500 leading-relaxed">Vous êtes sur le point de vous déconnecter. Voulez-vous continuer ?</p>
        </div>
        <div className="flex gap-3 mt-1">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold shadow-sm transition-colors bg-red-500 hover:bg-red-600"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
