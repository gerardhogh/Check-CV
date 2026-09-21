"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Mail,
  Download,
  Eye,
  Video,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Share2,
  CheckCircle,
} from "lucide-react";

export interface CandidatData {
  id: string | number;
  name: string;
  profession: string;
  location: string;
  email?: string;
  phone?: string;
  imageUrl?: string;
  cvUrl?: string;
  videoUrl?: string;
  status?: "Accepté" | "En attente" | "Rejeté";
}

interface CandidatProfilDetailProps {
  candidat?: CandidatData;
  onBack: () => void;
  onSendEmail?: (email: string, name: string) => void;
}

export default function CandidatProfilDetail({
  candidat,
  onBack,
  onSendEmail,
}: CandidatProfilDetailProps) {
  const [activeSubTab, setActiveSubTab] = useState<"informations" | "reseaux" | "video">("informations");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const name = candidat?.name || "Alicia PARKER";
  const profession = candidat?.profession || "Développeur Frontend";
  const email = candidat?.email || "jean.dossou@mail.com";
  const phone = candidat?.phone || "+229 01 91 49 61 67";
  const imageUrl = candidat?.imageUrl || "/assets/candidate-alicia-parker.jpg";

  const showNotification = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleDownloadCv = () => {
    showNotification("Téléchargement du CV au format PDF en cours...");
  };

  const handlePreviewCv = () => {
    showNotification("Ouverture de l'aperçu du document CV...");
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm animate-fade-in border border-slate-700">
          <CheckCircle size={18} className="text-green-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Breadcrumb & Retour */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium">
          <button
            type="button"
            onClick={onBack}
            className="hover:text-[#32A8D7] transition-colors"
          >
            Accueil
          </button>
          <span>&rsaquo;</span>
          <button
            type="button"
            onClick={onBack}
            className="hover:text-[#32A8D7] transition-colors"
          >
            Liste des candidatures
          </button>
          <span>&rsaquo;</span>
          <span className="text-slate-800 font-bold">Profil du talent</span>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#32A8D7] hover:underline"
        >
          <ArrowLeft size={16} />
          Retour à la liste
        </button>
      </div>

      {/* Layout principal : Colonne Gauche (Profil + CV) & Colonne Droite (3 Tabs) */}
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">

        {/* ── COLONNE GAUCHE ── */}
        <div className="space-y-6">

          {/* Carte Résumé Profil */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col items-center text-center">
            <div className="relative w-28 h-28 rounded-full overflow-hidden mb-4 ring-4 ring-pink-100 bg-pink-100">
              <Image
                src={imageUrl}
                alt={name}
                fill
                sizes="112px"
                className="object-cover"
              />
            </div>

            <h2 className="text-lg font-bold text-slate-900 leading-snug">
              {name}
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5 mb-3">
              {profession}
            </p>

            <div className="flex items-center gap-2 mb-5">
              <span className="text-[11px] font-bold px-3 py-0.5 rounded-md bg-emerald-500 text-white">
                Actif
              </span>
              <span className="text-[11px] font-bold px-3 py-0.5 rounded-md bg-sky-50 text-[#32A8D7] border border-sky-200">
                Certifié
              </span>
            </div>

            <button
              type="button"
              onClick={() => onSendEmail ? onSendEmail(email, name) : showNotification(`Email adressé à ${name}`)}
              className="w-full py-2.5 px-4 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors shadow-xs"
            >
              Envoyer un mail
            </button>
          </div>

          {/* Carte CV actualisé */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-700">
              CV actualisé le 21 avril 2025
            </h3>

            {/* Document Preview */}
            <div className="relative w-full aspect-[1/1.3] rounded-lg overflow-hidden border border-slate-200 bg-slate-50 shadow-inner group">
              <Image
                src="/assets/candidate-alicia-parker.jpg"
                alt="Aperçu CV"
                fill
                sizes="300px"
                className="object-cover opacity-90 group-hover:scale-102 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] text-white font-medium bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded">
                  Document certifié Check CV
                </span>
              </div>
            </div>

            {/* Actions CV */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleDownloadCv}
                className="flex-1 py-2 px-2 text-[11px] font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-md transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Download size={13} className="text-red-500" />
                Télécharger le pdf
              </button>
              <button
                type="button"
                onClick={handlePreviewCv}
                className="flex-1 py-2 px-2 text-[11px] font-semibold text-white bg-[#32A8D7] hover:bg-[#2896c2] rounded-md transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Eye size={13} />
                Prévisualiser
              </button>
            </div>
          </div>

        </div>

        {/* ── COLONNE DROITE : TABS DU PROFIL ── */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col">

          {/* Onglets navigation supérieure */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl mb-8 max-w-lg">
            <button
              type="button"
              onClick={() => setActiveSubTab("informations")}
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${
                activeSubTab === "informations"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Informations
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab("reseaux")}
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${
                activeSubTab === "reseaux"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Réseaux
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab("video")}
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${
                activeSubTab === "video"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Vidéo Entretien
            </button>
          </div>

          {/* ── SUB-TAB 1 : INFORMATIONS ── */}
          {activeSubTab === "informations" && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Prénom
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="Jean"
                    className="w-full bg-slate-100 border border-slate-200/80 rounded-md py-2.5 px-3.5 text-xs text-slate-800 font-medium outline-none cursor-default"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Nom
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="DOSSOU"
                    className="w-full bg-slate-100 border border-slate-200/80 rounded-md py-2.5 px-3.5 text-xs text-slate-800 font-medium outline-none cursor-default"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Titre professionnel
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="Développeur Frontend"
                    className="w-full bg-slate-100 border border-slate-200/80 rounded-md py-2.5 px-3.5 text-xs text-slate-800 font-medium outline-none cursor-default"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Nom d'utilisateur
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="jeandossou2345"
                    className="w-full bg-slate-100 border border-slate-200/80 rounded-md py-2.5 px-3.5 text-xs text-slate-800 font-medium outline-none cursor-default"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Sexe H/F
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="Femme"
                    className="w-full bg-slate-100 border border-slate-200/80 rounded-md py-2.5 px-3.5 text-xs text-slate-800 font-medium outline-none cursor-default"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Types d'opportunités recherchées
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="Emploi"
                    className="w-full bg-slate-100 border border-slate-200/80 rounded-md py-2.5 px-3.5 text-xs text-slate-800 font-medium outline-none cursor-default"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Pays/Nationalité
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="Benin"
                    className="w-full bg-slate-100 border border-slate-200/80 rounded-md py-2.5 px-3.5 text-xs text-slate-800 font-medium outline-none cursor-default"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Ville
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="Cotonou"
                    className="w-full bg-slate-100 border border-slate-200/80 rounded-md py-2.5 px-3.5 text-xs text-slate-800 font-medium outline-none cursor-default"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Numéro de téléphone
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={phone}
                    className="w-full bg-slate-100 border border-slate-200/80 rounded-md py-2.5 px-3.5 text-xs text-slate-800 font-medium outline-none cursor-default"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={email}
                    className="w-full bg-slate-100 border border-slate-200/80 rounded-md py-2.5 px-3.5 text-xs text-slate-800 font-medium outline-none cursor-default"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Biographie
                </label>
                <textarea
                  readOnly
                  rows={3}
                  value="Développeur passionné avec 3 ans d'expérience dans la création d'applications web réactives."
                  className="w-full bg-slate-100 border border-slate-200/80 rounded-md p-3.5 text-xs text-slate-800 font-medium outline-none cursor-default resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Compétences clés
                </label>
                <input
                  type="text"
                  readOnly
                  value="Javascript, Node js, Laravel, Web design"
                  className="w-full bg-slate-100 border border-slate-200/80 rounded-md py-2.5 px-3.5 text-xs text-slate-800 font-medium outline-none cursor-default"
                />
              </div>
            </div>
          )}

          {/* ── SUB-TAB 2 : RÉSEAUX ── */}
          {activeSubTab === "reseaux" && (
            <div className="space-y-4 animate-fade-in max-w-2xl">
              {[
                { label: "Facebook", prefix: "https://web.facebook.com/gerardhounnou.gh", color: "text-blue-600" },
                { label: "LinkedIn", prefix: "https://web.facebook.com/gerardhounnou.gh", color: "text-sky-700" },
                { label: "Twitter", prefix: "https://web.facebook.com/gerardhounnou.gh", color: "text-slate-900" },
                { label: "Pinterest", prefix: "https://web.facebook.com/gerardhounnou.gh", color: "text-red-600" },
                { label: "Behance", prefix: "https://web.facebook.com/gerardhounnou.gh", color: "text-blue-500" },
              ].map((network) => (
                <div key={network.label} className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className={`w-28 text-xs font-bold ${network.color}`}>
                    {network.label} :
                  </span>
                  <input
                    type="text"
                    readOnly
                    value={network.prefix}
                    className="flex-1 bg-white border border-slate-200 rounded-md py-2.5 px-3.5 text-xs text-slate-700 font-medium outline-none hover:border-slate-300"
                  />
                </div>
              ))}
            </div>
          )}

          {/* ── SUB-TAB 3 : VIDÉO ENTRETIEN ── */}
          {activeSubTab === "video" && (
            <div className="space-y-6 animate-fade-in">
              {/* Header de section vidéo */}
              <div className="flex items-center gap-2.5 text-[#32A8D7]">
                <Video size={22} />
                <h3 className="text-base font-bold text-[#0071a2]">
                  Entretien vidéo de {name}
                </h3>
              </div>

              {/* Texte explicatif officiel */}
              <div className="p-4 sm:p-5 rounded-xl bg-sky-50/60 border border-sky-100 text-xs text-slate-700 space-y-3 leading-relaxed">
                <p>
                  Ce test est constitué de 20 questions avec une variation de temps pour répondre. Les talents disposent de 3 tentatives. En cas d'annulation, l'entretien recommence depuis le début.
                </p>
                <p>
                  Si les 3 tentatives ont étés annulées sans succès, ils devront attendre 3 jours avant de pouvoir réessayer.
                </p>
                <p className="font-bold italic text-slate-800">
                  Bon visionnage à vous !
                </p>
              </div>

              {/* Lecteur Vidéo interactif avec la vidéo enregistrée par le talent */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 shadow-xl border border-slate-200">
                <Image
                  src="/assets/candidate-alicia-parker.jpg"
                  alt={`Vidéo entretien de ${name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover opacity-90"
                />

                {/* Overlay sombre */}
                <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setIsPlaying(!isPlaying);
                      showNotification(isPlaying ? "Vidéo en pause" : "Lecture de l'entretien vidéo...");
                    }}
                    className="w-16 h-16 rounded-full bg-white/90 hover:bg-white text-[#32A8D7] shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause size={28} className="fill-current" /> : <Play size={28} className="fill-current translate-x-0.5" />}
                  </button>
                </div>

                {/* Barre de contrôle inférieure */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex items-center gap-4 text-white">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1 hover:text-[#32A8D7] transition-colors"
                  >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                  </button>

                  <span className="text-xs font-mono font-medium">18:00</span>

                  {/* Timeline Bar */}
                  <div className="flex-1 h-1.5 bg-white/30 rounded-full overflow-hidden cursor-pointer">
                    <div className="h-full bg-[#32A8D7] w-2/5 rounded-full" />
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1 hover:text-[#32A8D7] transition-colors"
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>

                  <button
                    type="button"
                    onClick={() => showNotification("Plein écran activé")}
                    className="p-1 hover:text-[#32A8D7] transition-colors"
                  >
                    <Maximize2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
