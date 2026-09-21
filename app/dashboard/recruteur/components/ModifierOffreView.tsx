"use client";

import { useState } from "react";
import { ArrowLeft, Save, X } from "lucide-react";

export interface OffreData {
  id: string | number;
  titre: string;
  entreprise: string;
  typeEmploi: string;
  pays: string;
  ville: string;
  modeEmploi: string;
  description: string;
}

interface ModifierOffreViewProps {
  offre?: OffreData;
  onBack: () => void;
  onSave?: (offre: OffreData) => void;
}

export default function ModifierOffreView({ offre, onBack, onSave }: ModifierOffreViewProps) {
  const [titre, setTitre] = useState(offre?.titre || "Développeur Front-end");
  const [entreprise, setEntreprise] = useState(offre?.entreprise || "TechAfrique");
  const [typeEmploi, setTypeEmploi] = useState(offre?.typeEmploi || "CDI");
  const [pays, setPays] = useState(offre?.pays || "Benin");
  const [ville, setVille] = useState(offre?.ville || "Cotonou");
  const [modeEmploi, setModeEmploi] = useState(offre?.modeEmploi || "Temps partiel");
  const [description, setDescription] = useState(
    offre?.description ||
      "Nous recherchons un développeur Front-end passionné et talentueux pour rejoindre notre équipe dynamique. Vous participerez à la conception et au développement de nos interfaces utilisateur modernes et réactives."
  );

  const handleSave = () => {
    onSave?.({
      id: offre?.id || Date.now(),
      titre,
      entreprise,
      typeEmploi,
      pays,
      ville,
      modeEmploi,
      description,
    });
    onBack();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
          aria-label="Retour"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Modifier l&apos;offre</h2>
          <p className="text-xs text-slate-400 mt-0.5">Mettez à jour les informations de votre offre d&apos;emploi</p>
        </div>
      </div>

      {/* Form card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Intitulé du poste */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Intitulé du poste <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-medium outline-none focus:border-[#32A8D7] focus:bg-white transition-colors placeholder:text-slate-400"
              placeholder="Ex: Développeur Front-end"
            />
          </div>

          {/* Entreprise */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Entreprise <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={entreprise}
              onChange={(e) => setEntreprise(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-medium outline-none focus:border-[#32A8D7] focus:bg-white transition-colors placeholder:text-slate-400"
              placeholder="Nom de l'entreprise"
            />
          </div>

          {/* Type de travail */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Type de travail
            </label>
            <div className="relative">
              <select
                value={typeEmploi}
                onChange={(e) => setTypeEmploi(e.target.value)}
                className="w-full appearance-none px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-medium outline-none focus:border-[#32A8D7] focus:bg-white transition-colors cursor-pointer"
              >
                <option value="CDI">CDI</option>
                <option value="CDD">CDD</option>
                <option value="Stage">Stage</option>
                <option value="Freelance">Freelance</option>
                <option value="Alternance">Alternance</option>
                <option value="Intérim">Intérim</option>
              </select>
              <svg className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>

          {/* Lieu du travail – Pays */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Pays
            </label>
            <div className="relative">
              <select
                value={pays}
                onChange={(e) => setPays(e.target.value)}
                className="w-full appearance-none px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-medium outline-none focus:border-[#32A8D7] focus:bg-white transition-colors cursor-pointer"
              >
                <option value="Benin">Bénin</option>
                <option value="Cote d'Ivoire">Côte d&apos;Ivoire</option>
                <option value="Senegal">Sénégal</option>
                <option value="Togo">Togo</option>
                <option value="Cameroun">Cameroun</option>
                <option value="France">France</option>
              </select>
              <svg className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>

          {/* Ville */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Ville
            </label>
            <input
              type="text"
              value={ville}
              onChange={(e) => setVille(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-medium outline-none focus:border-[#32A8D7] focus:bg-white transition-colors placeholder:text-slate-400"
              placeholder="Ex: Cotonou"
            />
          </div>

          {/* Mode de travail */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Mode de travail
            </label>
            <div className="flex flex-wrap gap-3">
              {["Temps plein", "Temps partiel", "Télétravail", "Hybride", "Sur site"].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setModeEmploi(mode)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                    modeEmploi === mode
                      ? "bg-[#32A8D7] text-white border-[#32A8D7] shadow-sm"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:border-[#32A8D7]/50 hover:text-[#32A8D7]"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Description de l&apos;offre <span className="text-red-400">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-medium outline-none focus:border-[#32A8D7] focus:bg-white transition-colors resize-none placeholder:text-slate-400"
              placeholder="Décrivez le poste, les missions, le profil recherché..."
            />
            <p className="text-xs text-slate-400 mt-1.5">{description.length} caractères</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-slate-100">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors"
          >
            <X size={15} />
            Annuler
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#32A8D7] hover:bg-[#2896c2] text-white text-sm font-semibold shadow-sm hover:shadow-md transition-all"
          >
            <Save size={15} />
            Enregistrer les informations
          </button>
        </div>
      </div>
    </div>
  );
}
