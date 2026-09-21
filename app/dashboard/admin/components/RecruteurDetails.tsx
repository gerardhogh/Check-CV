"use client";
import React, { useState } from "react";
import Image from "next/image";

export function RecruteurDetails({ recruteur, onBack }: { recruteur: any, onBack: () => void }) {
  const [activeTab, setActiveTab] = useState("Informations");

  return (
    <div className="animate-fade-in-up">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <button onClick={onBack} className="hover:text-slate-800 transition-colors">Accueil</button>
        <span>›</span>
        <button onClick={onBack} className="hover:text-slate-800 transition-colors">Liste des recruteurs</button>
        <span>›</span>
        <span className="text-slate-800 font-semibold">Détails</span>
      </div>

      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm flex flex-col items-center">
          <div className="w-24 h-24 rounded-2xl overflow-hidden border border-slate-100 shadow-sm mb-6 relative bg-slate-50 flex items-center justify-center p-2">
            {recruteur.logo ? (
              <Image src={recruteur.logo} alt={recruteur.name} fill className="object-contain" />
            ) : (
              <div className="text-3xl font-black text-slate-300">{recruteur.name.substring(0, 1)}</div>
            )}
          </div>
          
          <div className="w-full">
            <div className="flex bg-slate-50 p-1 rounded-xl mb-6">
              {["Informations", "Réseaux"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-colors ${activeTab === tab ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "Informations" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Nom de l'entreprise</label>
                  <input readOnly type="text" value={recruteur.name} className="w-full bg-slate-50 border-none rounded-lg p-3 text-sm text-slate-600 focus:ring-0" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Secteur d'activité</label>
                  <input readOnly type="text" value={recruteur.secteur || "Non renseigné"} className="w-full bg-slate-50 border-none rounded-lg p-3 text-sm text-slate-600 focus:ring-0" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Email de contact</label>
                  <input readOnly type="text" value={recruteur.email} className="w-full bg-slate-50 border-none rounded-lg p-3 text-sm text-slate-600 focus:ring-0" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Téléphone</label>
                  <input readOnly type="text" value={recruteur.contact} className="w-full bg-slate-50 border-none rounded-lg p-3 text-sm text-slate-600 focus:ring-0" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Site web</label>
                  <input readOnly type="text" value={recruteur.website || "Non renseigné"} className="w-full bg-slate-50 border-none rounded-lg p-3 text-sm text-slate-600 focus:ring-0" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Adresse</label>
                  <input readOnly type="text" value={recruteur.address || "Non renseigné"} className="w-full bg-slate-50 border-none rounded-lg p-3 text-sm text-slate-600 focus:ring-0" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Description de l'entreprise</label>
                  <textarea readOnly value={recruteur.description || "Non renseigné"} rows={3} className="w-full bg-slate-50 border-none rounded-lg p-3 text-sm text-slate-600 focus:ring-0 resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Compétences clés</label>
                  <input readOnly type="text" value={recruteur.skills || "Non renseigné"} className="w-full bg-slate-50 border-none rounded-lg p-3 text-sm text-slate-600 focus:ring-0" />
                </div>
              </div>
            )}

            {activeTab === "Réseaux" && (
              <div className="text-center text-slate-500 py-20">
                Contenu des réseaux sociaux
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
