"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Search,
  Bookmark,
  Share2,
  Mail,
  Eye,
  CheckCircle,
  MapPin,
  X,
} from "lucide-react";

interface CandidatFavori {
  id: string;
  name: string;
  profession: string;
  location: string;
  savedAgo: string;
  imageUrl: string;
  isVerified: boolean;
}

const MOCK_FAVORIS: CandidatFavori[] = Array.from({ length: 12 }, (_, i) => ({
  id: `fav_${i}`,
  name: "Alicia PARKER",
  profession: "Designer web",
  location: "Cotonou, Bénin",
  savedAgo: i === 0 ? "Enregistré il y a 2 min" : i === 1 ? "Enregistré il y a 15 min" : i < 4 ? "Enregistré il y a 1h" : "Enregistré il y a 2 jours",
  imageUrl: "/assets/candidate-alicia-parker.jpg",
  isVerified: true,
}));

interface FavorisTabProps {
  onViewProfile?: (id: string) => void;
  onSendEmail?: (name: string) => void;
}

export default function FavorisTab({ onViewProfile, onSendEmail }: FavorisTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [favoris, setFavoris] = useState<CandidatFavori[]>(MOCK_FAVORIS);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const removeFavori = (id: string) => {
    setFavoris(favoris.filter((f) => f.id !== id));
    showToast("Profil retiré des favoris.");
  };

  const handleShare = (name: string) => {
    navigator.clipboard?.writeText(`https://check-cv.com/profils/${name.toLowerCase().replace(" ", "-")}`).catch(() => {});
    showToast(`Lien du profil de ${name} copié !`);
  };

  const filtered = favoris.filter(
    (f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm animate-fade-in border border-slate-700">
          <CheckCircle size={16} className="text-green-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Search bar */}
      <div className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 shadow-sm px-4 py-2.5">
        <Search size={18} className="text-slate-400 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 outline-none text-sm text-slate-800 bg-transparent placeholder:text-slate-400 font-medium"
          placeholder="Rechercher dans vos favoris..."
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery("")} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={15} />
          </button>
        )}
        <button className="px-5 py-2 bg-[#32A8D7] hover:bg-[#2896c2] text-white text-sm font-semibold rounded-lg transition-colors">
          Rechercher
        </button>
      </div>

      {/* Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-600">
          {filtered.length} profil{filtered.length !== 1 ? "s" : ""} enregistré{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-slate-100 shadow-sm text-center">
          <Bookmark size={40} className="text-slate-200 mx-auto mb-3" />
          <p className="text-slate-500 font-semibold">Aucun favori trouvé</p>
          <p className="text-slate-400 text-sm mt-1">Essayez un autre terme de recherche.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((candidat) => (
            <div
              key={candidat.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all flex flex-col overflow-hidden"
            >
              {/* Top action bar */}
              <div className="flex items-center justify-between px-4 pt-4 pb-2">
                <span className="text-[10px] text-slate-400 font-medium">{candidat.savedAgo}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleShare(candidat.name)}
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                    title="Partager"
                  >
                    <Share2 size={14} />
                  </button>
                  <button
                    onClick={() => removeFavori(candidat.id)}
                    className="p-1.5 rounded-lg bg-[#32A8D7] text-white hover:bg-[#2896c2] transition-colors"
                    title="Retirer des favoris"
                  >
                    <Bookmark size={14} fill="white" />
                  </button>
                </div>
              </div>

              {/* Avatar + info */}
              <div className="flex flex-col items-center px-4 pb-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-slate-100 shadow-sm mb-3">
                  <Image
                    src={candidat.imageUrl}
                    alt={candidat.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(candidat.name)}&background=32A8D7&color=fff&size=128`;
                    }}
                  />
                  {candidat.isVerified && (
                    <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#32A8D7] rounded-full flex items-center justify-center border-2 border-white">
                      <CheckCircle size={10} className="text-white" />
                    </div>
                  )}
                </div>

                <h3 className="font-bold text-slate-900 text-sm text-center">{candidat.name}</h3>
                <p className="text-xs text-[#32A8D7] font-medium text-center mt-0.5">{candidat.profession}</p>
                <div className="flex items-center gap-1 mt-1 text-[11px] text-slate-400">
                  <MapPin size={10} />
                  <span>{candidat.location}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="px-4 pb-4 flex gap-2 mt-auto">
                <button
                  onClick={() => { onSendEmail?.(candidat.name); showToast(`Email envoyé à ${candidat.name}`); }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors"
                >
                  <Mail size={12} /> Email
                </button>
                <button
                  onClick={() => onViewProfile?.(candidat.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#32A8D7] hover:bg-[#2896c2] text-white text-xs font-semibold transition-colors"
                >
                  <Eye size={12} /> Voir profil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
