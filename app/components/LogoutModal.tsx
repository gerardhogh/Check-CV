"use client";

import { LogOut } from "lucide-react";

interface LogoutModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({ onCancel, onConfirm }: LogoutModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onCancel}
      ></div>
      <div className="relative bg-white w-full max-w-sm rounded-3xl shadow-2xl p-7 flex flex-col gap-4 animate-fade-in-up border border-slate-100 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm border border-red-100">
          <LogOut className="w-8 h-8 text-red-500 ml-1" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 mb-2">Déconnexion</h2>
          <p className="text-sm text-slate-500">Vous êtes sur le point de vous déconnecter. Voulez-vous continuer ?</p>
        </div>
        <div className="flex gap-3 mt-4">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold shadow-md shadow-red-500/20 transition-all active:scale-[0.98]"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}
