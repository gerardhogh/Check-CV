"use client";

import { useState } from "react";
import { 
  Search, 
  Briefcase, 
  ChevronRight, 
  MapPin, 
  Users, 
  Clock, 
  CheckCircle,
  ArrowRight,
  Share2,
  Building,
  Mail,
  Phone,
  Globe,
  Link2
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock Data
const MOCK_JOBS = [
  {
    id: 1,
    title: "Développeur Front-end",
    company: "Grand-G",
    location: "Cotonou, Bénin",
    type: "Temps plein",
    contract: "CDI",
    employees: "1 - 10",
    category: "Développement web",
    status: "closed",
    skills: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    description: "Nous recherchons un Développeur Front-end talentueux et passionné pour rejoindre notre équipe dynamique à Cotonou. En tant que Développeur Front-end chez Grand-G, vous jouerez un rôle clé dans la conception, le développement et l'optimisation de nos interfaces utilisateur web. Vous travaillerez en étroite collaboration avec nos designers UX/UI et nos développeurs back-end pour créer des expériences utilisateur exceptionnelles.\n\nResponsabilités :\n- Développer de nouvelles fonctionnalités orientées utilisateur.\n- Créer du code réutilisable et des bibliothèques pour une utilisation future.\n- S'assurer de la faisabilité technique des conceptions UI/UX."
  },
  {
    id: 2,
    title: "Community Manager",
    company: "TechAfrica",
    location: "Dakar, Sénégal",
    type: "Temps partiel",
    contract: "CDD",
    employees: "11 - 50",
    category: "Marketing",
    status: "open",
    skills: ["Réseaux Sociaux", "Création de contenu", "Canva", "Copywriting"],
    description: "Nous recherchons un Community Manager pour gérer notre présence en ligne."
  },
];

const JOB_BOARDS = [
  "LinkedIn Jobs", "Indeed", "OptionCarriere", "Glassdoor", "Google for Jobs", 
  "Malt", "Novojob", "Emploi.sn", "Educarriere", "Talents publics",
  "Upwork", "Fiverr", "Freelancer", "Welcome to the Jungle", "Monster",
  "JobTeaser", "HelloWork", "Apec"
];

type ViewState = "list" | "detail" | "company";

export default function OffresEmplois() {
  const [view, setView] = useState<ViewState>("list");
  const [selectedJob, setSelectedJob] = useState<typeof MOCK_JOBS[0] | null>(null);
  const [companyTab, setCompanyTab] = useState<"info" | "reseaux">("info");
  const [search, setSearch] = useState("");

  const handleViewDetail = (job: typeof MOCK_JOBS[0]) => {
    setSelectedJob(job);
    setView("detail");
  };

  const handleViewCompany = () => {
    setView("company");
  };

  const filteredJobs = MOCK_JOBS.filter(j => 
    j.title.toLowerCase().includes(search.toLowerCase()) || 
    j.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* --- VUE LISTE --- */}
      {view === "list" && (
        <>
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Offres d'emplois</h2>
                <p className="text-xs text-slate-400">
                  Postulez directement auprès des entreprises partenaires
                </p>
              </div>
              <div className="relative w-full sm:w-64">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Rechercher une offre..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-3">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div key={job.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#32A8D7] flex items-center justify-center flex-shrink-0">
                        <Briefcase size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{job.title}</h4>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs text-slate-500 mt-1">
                          <span className="flex items-center gap-1"><Building size={12} /> {job.company}</span>
                          <span className="hidden sm:inline">•</span>
                          <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleViewDetail(job)}
                      className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-xl transition-colors whitespace-nowrap"
                    >
                      Voir détail
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-500 text-sm">
                  Aucune offre ne correspond à votre recherche.
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl space-y-6">
            <h3 className="font-bold text-slate-900 text-lg">Sites pour postuler aux meilleures offres d'emplois</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {JOB_BOARDS.map((board, i) => (
                <div key={i} className="aspect-square bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center p-4 text-center hover:bg-slate-100 transition-colors cursor-pointer">
                  <span className="text-xs font-semibold text-slate-600">{board}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl space-y-6">
            <h3 className="font-bold text-slate-900 text-lg">Conseils pratiques</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Rédiger un CV attrayant", desc: "Mettez en valeur vos compétences de manière claire." },
                { title: "Se préparer aux entretiens", desc: "Anticipez les questions fréquentes." },
                { title: "Réseautage efficace", desc: "Développez votre réseau professionnel." }
              ].map((tip, i) => (
                <div key={i} className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
                  <h4 className="font-bold text-[#32A8D7] mb-2">{tip.title}</h4>
                  <p className="text-sm text-slate-600">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* --- VUE DÉTAIL OFFRE --- */}
      {view === "detail" && selectedJob && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <button onClick={() => setView("list")} className="hover:text-slate-900">Accueil</button>
            <ChevronRight size={14} />
            <button onClick={() => setView("list")} className="hover:text-slate-900">Offres d'emplois</button>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-medium">{selectedJob.category}</span>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl relative">
            <div className="absolute top-8 right-8 flex flex-col items-end gap-3">
              <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors">
                <ArrowRight size={18} />
              </button>
              {selectedJob.status === "closed" ? (
                <span className="px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full border border-red-100">
                  Offre clôturée
                </span>
              ) : (
                <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full border border-green-100">
                  Ouverte
                </span>
              )}
            </div>

            <div className="max-w-3xl">
              <h2 className="text-2xl font-black text-slate-900 mb-2">{selectedJob.title}</h2>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 text-sm text-slate-500 mb-6">
                <span className="flex items-center gap-1">
                  Entreprise : <button onClick={handleViewCompany} className="text-[#32A8D7] font-semibold hover:underline ml-1">{selectedJob.company}</button>
                </span>
                <span className="flex items-center gap-1"><MapPin size={14} /> {selectedJob.location}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1.5 bg-slate-50 text-slate-700 text-xs font-medium rounded-lg border border-slate-200 flex items-center gap-1.5">
                  <Users size={14} className="text-slate-400" /> {selectedJob.employees} employés
                </span>
                <span className="px-3 py-1.5 bg-slate-50 text-slate-700 text-xs font-medium rounded-lg border border-slate-200 flex items-center gap-1.5">
                  <Clock size={14} className="text-slate-400" /> {selectedJob.type}
                </span>
                <span className="px-3 py-1.5 bg-slate-50 text-slate-700 text-xs font-medium rounded-lg border border-slate-200">
                  {selectedJob.contract}
                </span>
                <span className="px-3 py-1.5 bg-slate-50 text-slate-700 text-xs font-medium rounded-lg border border-slate-200">
                  {selectedJob.category}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-3">Compétences</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills.map((skill, i) => (
                    <span key={i} className="px-4 py-2 bg-slate-900 text-white text-xs font-medium rounded-xl">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl">
            <h3 className="font-bold text-slate-900 text-lg mb-4">Description de l'Offre</h3>
            <div className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">
              {selectedJob.description}
            </div>
          </div>

          {/* Sticky Bottom Bar */}
          <div className="sticky bottom-4 flex justify-between items-center bg-white p-4 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-slate-100 mt-8 z-10">
            <button 
              onClick={() => setView("list")}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors"
            >
              Retour
            </button>
            <button 
              disabled={selectedJob.status === "closed"}
              className={`px-8 py-3 text-white text-sm font-bold rounded-xl transition-colors shadow-lg ${
                selectedJob.status === "closed" 
                ? "bg-slate-400 cursor-not-allowed shadow-none" 
                : "bg-[#32A8D7] hover:bg-[#288eb8] shadow-blue-500/25"
              }`}
            >
              Postuler maintenant
            </button>
          </div>
        </div>
      )}

      {/* --- VUE INFORMATIONS ENTREPRISE --- */}
      {view === "company" && selectedJob && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <button onClick={() => setView("list")} className="hover:text-slate-900">Accueil</button>
            <ChevronRight size={14} />
            <button onClick={() => setView("list")} className="hover:text-slate-900">Offres d'emplois</button>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-medium">Informations entreprise</span>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl">
            {/* Header / Logo */}
            <div className="p-8 pb-0 flex items-end gap-6 border-b border-slate-100 relative">
              <div className="w-24 h-24 bg-slate-100 rounded-2xl border-4 border-white shadow-sm flex items-center justify-center translate-y-6 z-10 relative overflow-hidden">
                <span className="text-4xl font-black text-slate-300">{selectedJob.company.charAt(0)}</span>
              </div>
              <div className="pb-4">
                <h2 className="text-2xl font-black text-slate-900">{selectedJob.company}</h2>
                <p className="text-sm text-slate-500">Informations de l'entreprise</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-8 px-8 pt-10 border-b border-slate-100 bg-slate-50/50">
              <button 
                onClick={() => setCompanyTab("info")}
                className={`pb-4 text-sm font-semibold border-b-2 transition-colors ${
                  companyTab === "info" ? "border-[#32A8D7] text-[#32A8D7]" : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                Informations
              </button>
              <button 
                onClick={() => setCompanyTab("reseaux")}
                className={`pb-4 text-sm font-semibold border-b-2 transition-colors ${
                  companyTab === "reseaux" ? "border-[#32A8D7] text-[#32A8D7]" : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                Réseaux
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              {companyTab === "info" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500">Nom</label>
                    <input type="text" disabled value={selectedJob.company} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500">Secteur</label>
                    <input type="text" disabled value="Technologie" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500">Email</label>
                    <input type="text" disabled value="contact@grandg.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500">Téléphone</label>
                    <input type="text" disabled value="+229 01 02 03 04" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700" />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-medium text-slate-500">Site web</label>
                    <input type="text" disabled value="https://www.grandg.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700" />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-medium text-slate-500">Adresse</label>
                    <input type="text" disabled value={selectedJob.location} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700" />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-medium text-slate-500">Description</label>
                    <textarea disabled value="Grand-G est une entreprise leader dans le développement de solutions web innovantes en Afrique de l'Ouest." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 h-24 resize-none" />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-medium text-slate-500">Compétences clés</label>
                    <input type="text" disabled value="Développement web, Design UI/UX, Cloud Computing" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700" />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500">Facebook</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">f</span>
                      <input type="text" disabled value="facebook.com/grandg" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500">LinkedIn</label>
                    <div className="relative">
                      <Link2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input type="text" disabled value="linkedin.com/company/grandg" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500">Twitter / X</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-black">𝕏</span>
                      <input type="text" disabled value="twitter.com/grandg_tech" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500">Pinterest</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">P</span>
                      <input type="text" disabled value="" placeholder="Non renseigné" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500">Behance</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Bē</span>
                      <input type="text" disabled value="behance.net/grandg" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700" />
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-end">
                <button 
                  onClick={() => setView("detail")}
                  className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors"
                >
                  Retour à l'offre
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
