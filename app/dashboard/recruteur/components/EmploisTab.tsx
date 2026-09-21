"use client";

import { useState } from "react";
import {
  Briefcase,
  Plus,
  Eye,
  MoreHorizontal,
  MapPin,
  Users,
  Calendar,
  X,
  Save,
  CheckCircle2,
  Clock,
  Trash2,
  Edit3,
} from "lucide-react";

interface Emploi {
  id: number;
  titre: string;
  entreprise: string;
  lieu: string;
  typeEmploi: string;
  candidatures: number;
  datePublication: string;
  status: "Active" | "Inactive";
}

const MOCK_EMPLOIS: Emploi[] = [
  { id: 1, titre: "Développeur Front-end", entreprise: "TechAfrique", lieu: "Cotonou, Bénin", typeEmploi: "CDI", candidatures: 24, datePublication: "12 Sept. 2024", status: "Active" },
  { id: 2, titre: "Designer UI/UX", entreprise: "CreativX Studio", lieu: "Abidjan, Côte d'Ivoire", typeEmploi: "CDD", candidatures: 18, datePublication: "8 Sept. 2024", status: "Active" },
  { id: 3, titre: "Chef de Projet Digital", entreprise: "DigitGroup", lieu: "Dakar, Sénégal", typeEmploi: "CDI", candidatures: 31, datePublication: "5 Sept. 2024", status: "Active" },
  { id: 4, titre: "Data Analyst", entreprise: "DataBenin", lieu: "Cotonou, Bénin", typeEmploi: "Stage", candidatures: 12, datePublication: "1 Sept. 2024", status: "Inactive" },
  { id: 5, titre: "Responsable Marketing", entreprise: "MarketPro", lieu: "Lomé, Togo", typeEmploi: "CDI", candidatures: 9, datePublication: "28 Août 2024", status: "Active" },
  { id: 6, titre: "Développeur Backend Node.js", entreprise: "TechAfrique", lieu: "Cotonou, Bénin", typeEmploi: "Freelance", candidatures: 7, datePublication: "24 Août 2024", status: "Inactive" },
  { id: 7, titre: "Community Manager", entreprise: "SocialHub Africa", lieu: "Abidjan, Côte d'Ivoire", typeEmploi: "CDI", candidatures: 15, datePublication: "20 Août 2024", status: "Active" },
  { id: 8, titre: "Comptable Senior", entreprise: "FinanceGroup", lieu: "Cotonou, Bénin", typeEmploi: "CDI", candidatures: 22, datePublication: "15 Août 2024", status: "Active" },
];

interface PublierModalProps {
  onClose: () => void;
  onPublish: (emploi: Partial<Emploi>) => void;
}

function PublierModal({ onClose, onPublish }: PublierModalProps) {
  const [titre, setTitre] = useState("");
  const [entreprise, setEntreprise] = useState("");
  const [lieu, setLieu] = useState("");
  const [typeEmploi, setTypeEmploi] = useState("CDI");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPublish({ titre, entreprise, lieu, typeEmploi });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Modal header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Publier une offre</h3>
            <p className="text-xs text-slate-400 mt-0.5">Remplissez les informations de votre offre d&apos;emploi</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Modal body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Intitulé du poste <span className="text-red-400">*</span>
            </label>
            <input
              required
              type="text"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 outline-none focus:border-[#32A8D7] focus:bg-white transition-colors"
              placeholder="Ex: Développeur Front-end"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Entreprise <span className="text-red-400">*</span>
            </label>
            <input
              required
              type="text"
              value={entreprise}
              onChange={(e) => setEntreprise(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 outline-none focus:border-[#32A8D7] focus:bg-white transition-colors"
              placeholder="Nom de l'entreprise"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Lieu</label>
              <input
                type="text"
                value={lieu}
                onChange={(e) => setLieu(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 outline-none focus:border-[#32A8D7] focus:bg-white transition-colors"
                placeholder="Cotonou, Bénin"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Type de contrat</label>
              <div className="relative">
                <select
                  value={typeEmploi}
                  onChange={(e) => setTypeEmploi(e.target.value)}
                  className="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 outline-none focus:border-[#32A8D7] focus:bg-white transition-colors cursor-pointer"
                >
                  <option>CDI</option>
                  <option>CDD</option>
                  <option>Stage</option>
                  <option>Freelance</option>
                  <option>Alternance</option>
                </select>
                <svg className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Description de l&apos;offre</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 outline-none focus:border-[#32A8D7] focus:bg-white transition-colors resize-none"
              placeholder="Décrivez le poste, les missions, le profil recherché..."
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-[#32A8D7] hover:bg-[#2896c2] text-white text-sm font-semibold shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <Save size={15} />
              Publier l&apos;offre
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface EmploisTabProps {
  onViewDetail?: (emploiId: number) => void;
}

export default function EmploisTab({ onViewDetail }: EmploisTabProps) {
  const [emplois, setEmplois] = useState<Emploi[]>(MOCK_EMPLOIS);
  const [showModal, setShowModal] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handlePublish = (data: Partial<Emploi>) => {
    const newEmploi: Emploi = {
      id: Date.now(),
      titre: data.titre || "Nouveau poste",
      entreprise: data.entreprise || "Mon entreprise",
      lieu: data.lieu || "Cotonou, Bénin",
      typeEmploi: data.typeEmploi || "CDI",
      candidatures: 0,
      datePublication: new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" }),
      status: "Active",
    };
    setEmplois([newEmploi, ...emplois]);
    showToast("Offre publiée avec succès !");
  };

  const toggleStatus = (id: number) => {
    setEmplois(emplois.map(e => e.id === id ? { ...e, status: e.status === "Active" ? "Inactive" : "Active" } : e));
    setOpenMenuId(null);
  };

  const deleteEmploi = (id: number) => {
    setEmplois(emplois.filter(e => e.id !== id));
    setOpenMenuId(null);
    showToast("Offre supprimée.");
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm animate-fade-in border border-slate-700">
          <CheckCircle2 size={16} className="text-green-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Modal */}
      {showModal && <PublierModal onClose={() => setShowModal(false)} onPublish={handlePublish} />}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Emplois créés</p>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-50 text-[#0071a2] text-xs font-bold rounded-full">
            <Briefcase size={11} />
            {emplois.length} emplois au total
          </span>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#32A8D7] hover:bg-[#2896c2] text-white rounded-xl text-sm font-semibold shadow-sm hover:shadow-md transition-all"
        >
          <Plus size={16} />
          Publier une offre
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {emplois.map((emploi) => (
          <div
            key={emploi.id}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all flex flex-col"
          >
            {/* Card header */}
            <div className="p-4 pb-3 flex items-start justify-between">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                  emploi.status === "Active"
                    ? "bg-green-50 text-green-600"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {emploi.status === "Active" ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                {emploi.status}
              </span>

              {/* More menu */}
              <div className="relative">
                <button
                  onClick={() => setOpenMenuId(openMenuId === emploi.id ? null : emploi.id)}
                  className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <MoreHorizontal size={16} />
                </button>
                {openMenuId === emploi.id && (
                  <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-20">
                    <button
                      onClick={() => { toggleStatus(emploi.id); }}
                      className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-2"
                    >
                      {emploi.status === "Active" ? <Clock size={13} /> : <CheckCircle2 size={13} />}
                      {emploi.status === "Active" ? "Clôturer l'offre" : "Réactiver l'offre"}
                    </button>
                    <button
                      onClick={() => { onViewDetail?.(emploi.id); setOpenMenuId(null); }}
                      className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Edit3 size={13} /> Modifier
                    </button>
                    <button
                      onClick={() => deleteEmploi(emploi.id)}
                      className="w-full text-left px-3.5 py-2 text-xs font-medium text-red-500 hover:bg-red-50 flex items-center gap-2"
                    >
                      <Trash2 size={13} /> Supprimer
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Card body */}
            <div className="px-4 pb-4 flex-1">
              <h3 className="font-bold text-slate-900 text-sm leading-snug mb-0.5">{emploi.titre}</h3>
              <p className="text-xs text-slate-500 font-medium">{emploi.entreprise}</p>

              <div className="mt-3 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <MapPin size={11} className="shrink-0" />
                  <span>{emploi.lieu}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <Briefcase size={11} className="shrink-0" />
                  <span>{emploi.typeEmploi}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <Users size={11} className="shrink-0" />
                  <span>{emploi.candidatures} candidature{emploi.candidatures !== 1 ? "s" : ""}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <Calendar size={11} className="shrink-0" />
                  <span>{emploi.datePublication}</span>
                </div>
              </div>
            </div>

            {/* Card footer */}
            <div className="px-4 pb-4">
              <button
                onClick={() => onViewDetail?.(emploi.id)}
                className="w-full py-2.5 rounded-xl bg-[#f0f9ff] hover:bg-[#e0f3fc] text-[#0071a2] text-xs font-semibold border border-sky-100 hover:border-sky-200 transition-colors flex items-center justify-center gap-2"
              >
                <Eye size={13} />
                Voir détail
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
