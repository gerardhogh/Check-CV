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
    title: "Développeur Front-end Senior (React / Next.js)",
    company: "Paystack",
    domain: "paystack.com",
    location: "Cotonou, Bénin (Hybride)",
    type: "Temps plein",
    contract: "CDI",
    employees: "500+ employés",
    category: "Ingénierie & Tech",
    status: "open",
    salary: "800 000 - 1 200 000 FCFA",
    postedAt: "Il y a 2 jours",
    skills: ["React", "Next.js", "Tailwind CSS", "TypeScript", "GraphQL"],
    description: "Nous recherchons un Développeur Front-end talentueux et passionné pour rejoindre notre équipe dynamique. Vous jouerez un rôle clé dans la conception, le développement et l'optimisation de nos interfaces de paiement web.\n\n✨ Ce que vous ferez :\n• Développer de nouvelles fonctionnalités orientées utilisateur.\n• Créer du code réutilisable et des bibliothèques pour une utilisation future.\n• Optimiser les applications pour une vitesse et une scalabilité maximales.\n\n🎯 Profil recherché :\n• Au moins 3 ans d'expérience en développement Front-end.\n• Maîtrise parfaite de React et de son écosystème.\n• Sensibilité accrue pour le design et l'UX."
  },
  {
    id: 2,
    title: "Product Marketing Manager",
    company: "MTN",
    domain: "mtn.bj",
    location: "Cotonou, Bénin",
    type: "Temps plein",
    contract: "CDI",
    employees: "1000+ employés",
    category: "Marketing",
    status: "open",
    salary: "600 000 - 900 000 FCFA",
    postedAt: "Il y a 5 heures",
    skills: ["Stratégie Go-to-Market", "Analyse de données", "Copywriting", "Gestion de projet"],
    description: "Rejoignez MTN pour diriger la stratégie marketing de nos nouveaux produits digitaux. Vous serez au centre de l'innovation, travaillant avec les équipes produit, vente et communication."
  },
  {
    id: 3,
    title: "Designer UX/UI",
    company: "Sèmè City",
    domain: "semecity.bj",
    location: "Sèmè-Podji, Bénin",
    type: "Hybride",
    contract: "Freelance",
    employees: "50 - 200 employés",
    category: "Design",
    status: "closed",
    salary: "Taux journalier à négocier",
    postedAt: "Il y a 2 semaines",
    skills: ["Figma", "Prototypage", "Recherche utilisateur", "Design System"],
    description: "Sèmè City recherche un designer UX/UI créatif pour repenser l'expérience digitale de ses plateformes éducatives et entrepreneuriales."
  }
];

const JOB_BOARDS = [
  { name: "LinkedIn Jobs", domain: "linkedin.com", url: "https://www.linkedin.com/jobs" },
  { name: "Indeed", domain: "indeed.com", url: "https://www.indeed.com" },
  { name: "OptionCarriere", domain: "optioncarriere.com", url: "https://www.optioncarriere.com" },
  { name: "Glassdoor", domain: "glassdoor.com", url: "https://www.glassdoor.com" },
  { name: "Google for Jobs", domain: "google.com", url: "https://careers.google.com" },
  { name: "Malt", domain: "malt.com", url: "https://www.malt.com" },
  { name: "Novojob", domain: "novojob.com", url: "https://www.novojob.com" },
  { name: "Emploi.sn", domain: "emploi.sn", url: "https://www.emploi.sn" },
  { name: "Educarriere", domain: "educarriere.ci", url: "https://www.educarriere.ci" },
  { name: "Talents publics", domain: "talents-publics.gouv.fr", url: "https://talents.gouv.fr" },
  { name: "Upwork", domain: "upwork.com", url: "https://www.upwork.com" },
  { name: "Fiverr", domain: "fiverr.com", url: "https://www.fiverr.com" },
  { name: "Freelancer", domain: "freelancer.com", url: "https://www.freelancer.com" },
  { name: "Welcome to the Jungle", domain: "welcometothejungle.com", url: "https://www.welcometothejungle.com" },
  { name: "Monster", domain: "monster.com", url: "https://www.monster.com" },
  { name: "JobTeaser", domain: "jobteaser.com", url: "https://www.jobteaser.com" },
  { name: "HelloWork", domain: "hellowork.com", url: "https://www.hellowork.com" },
  { name: "Apec", domain: "apec.fr", url: "https://www.apec.fr" }
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewCompany = () => {
    setView("company");
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Offres d'emplois</h2>
                <p className="text-sm text-slate-500 mt-1">
                  Découvrez les meilleures opportunités et postulez directement
                </p>
              </div>
              <div className="relative w-full sm:w-80">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Rechercher (ex: Développeur...)"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div key={job.id} onClick={() => handleViewDetail(job)} className="group cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border border-slate-100 bg-white hover:shadow-md transition-all gap-4">
                    <div className="flex items-start sm:items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl border border-slate-100 bg-white flex items-center justify-center flex-shrink-0 shadow-sm text-[#32A8D7] font-bold text-xl">
                        {job.company.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <h4 className="font-bold text-slate-900 text-base">{job.title}</h4>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 font-medium">
                          <span className="flex items-center gap-1.5 text-slate-600 font-semibold"><Building size={14} className="text-slate-400" /> {job.company}</span>
                          <span className="hidden sm:inline text-slate-300">•</span>
                          <span className="flex items-center gap-1.5"><MapPin size={14} className="text-slate-400" /> {job.location}</span>
                          <span className="hidden sm:inline text-slate-300">•</span>
                          <span className="flex items-center gap-1.5"><Clock size={14} className="text-slate-400" /> {job.postedAt}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-semibold">{job.contract}</span>
                          {job.salary && <span className="px-3 py-1 bg-green-50 text-green-600 rounded-md text-xs font-semibold">{job.salary}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-3 sm:mt-0">
                      <button 
                        className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold rounded-xl transition-colors whitespace-nowrap"
                      >
                        Détails
                      </button>
                      {job.status === "open" ? (
                         <button className="px-5 py-2.5 bg-[#32A8D7] hover:bg-blue-600 text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap">
                           Postuler
                         </button>
                      ) : (
                         <button className="px-5 py-2.5 bg-slate-50 border border-slate-100 text-slate-500 text-sm font-semibold rounded-xl whitespace-nowrap cursor-not-allowed">
                           Fermée
                         </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <Briefcase size={32} className="mx-auto text-slate-300 mb-3" />
                  <p className="text-sm font-medium">Aucune offre ne correspond à votre recherche.</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl space-y-6">
            <h3 className="font-bold text-slate-900 text-lg">Sites pour postuler aux meilleures offres d'emplois</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {JOB_BOARDS.map((board, i) => (
                <Link 
                  href={board.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  key={i} 
                  className="aspect-square bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center justify-center p-4 text-center hover:bg-white hover:border-blue-200 transition-all cursor-pointer shadow-sm hover:shadow-md gap-3 group"
                >
                  <div className="w-12 h-12 relative flex items-center justify-center overflow-hidden rounded-xl bg-white p-2 shadow-sm group-hover:scale-110 transition-transform">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={`https://logo.clearbit.com/${board.domain}`} 
                      alt={board.name} 
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(board.name)}&background=f8fafc&color=64748b&font-size=0.33&bold=true`;
                      }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-600 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
                    {board.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl space-y-6">
            <h3 className="font-bold text-slate-900 text-lg">Conseils pratiques</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Rédiger un CV attrayant", desc: "Mettez en valeur vos compétences de manière claire et concise." },
                { title: "Préparer ses entretiens", desc: "Anticipez les questions fréquentes et entraînez-vous." },
                { title: "Réseautage efficace", desc: "Développez votre réseau professionnel sur LinkedIn et ailleurs." }
              ].map((tip, i) => (
                <div key={i} className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                    <CheckCircle size={20} />
                  </div>
                  <h4 className="font-bold text-[#32A8D7] mb-2 text-sm">{tip.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* --- VUE DÉTAIL OFFRE --- */}
      {view === "detail" && selectedJob && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
            <button onClick={() => setView("list")} className="hover:text-blue-600 transition-colors">Accueil</button>
            <ChevronRight size={14} className="text-slate-400" />
            <button onClick={() => setView("list")} className="hover:text-blue-600 transition-colors">Offres d'emplois</button>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="text-slate-900 px-2 py-1 bg-slate-100 rounded-md">{selectedJob.category}</span>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl relative">
            {/* Banner */}
            <div className="h-32 w-full bg-gradient-to-r from-blue-600 to-blue-400"></div>
            
            <div className="absolute top-6 right-6 flex items-center gap-2">
              <button className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white transition-all shadow-sm">
                <Share2 size={16} />
              </button>
            </div>

            <div className="px-8 pb-8">
              {/* Logo & Status */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 mb-6">
                <div className="w-24 h-24 bg-white rounded-2xl border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://logo.clearbit.com/${selectedJob.domain}`} alt={selectedJob.company} className="w-16 h-16 object-contain" onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedJob.company)}&background=f8fafc&color=32A8D7&font-size=0.4`; }} />
                </div>
                
                {selectedJob.status === "closed" ? (
                  <span className="px-4 py-1.5 bg-red-50 text-red-600 text-xs font-bold rounded-full border border-red-100 inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> Offre clôturée
                  </span>
                ) : (
                  <span className="px-4 py-1.5 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-200 shadow-sm inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Recrutement en cours
                  </span>
                )}
              </div>

              <div className="max-w-3xl">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3 leading-tight">{selectedJob.title}</h2>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500 mb-8 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Building size={16} className="text-slate-400" />
                    <button onClick={handleViewCompany} className="text-blue-600 hover:text-blue-700 hover:underline transition-colors">{selectedJob.company}</button>
                  </span>
                  <span className="flex items-center gap-1.5"><MapPin size={16} className="text-slate-400" /> {selectedJob.location}</span>
                  <span className="flex items-center gap-1.5"><Clock size={16} className="text-slate-400" /> {selectedJob.postedAt}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col gap-1 text-center">
                    <Briefcase size={18} className="mx-auto text-slate-400 mb-1" />
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Type</span>
                    <span className="text-sm font-bold text-slate-800">{selectedJob.type}</span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col gap-1 text-center">
                    <CheckCircle size={18} className="mx-auto text-slate-400 mb-1" />
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Contrat</span>
                    <span className="text-sm font-bold text-slate-800">{selectedJob.contract}</span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col gap-1 text-center">
                    <Users size={18} className="mx-auto text-slate-400 mb-1" />
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Taille Ent.</span>
                    <span className="text-sm font-bold text-slate-800">{selectedJob.employees}</span>
                  </div>
                  <div className="p-4 bg-green-50/50 rounded-2xl border border-green-100 flex flex-col gap-1 text-center">
                    <span className="text-lg mb-1">💰</span>
                    <span className="text-[10px] text-green-600 uppercase font-bold tracking-wider">Salaire</span>
                    <span className="text-sm font-bold text-green-800 line-clamp-1">{selectedJob.salary || "À négocier"}</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                      <span className="w-1 h-5 bg-blue-600 rounded-full"></span> Description de l'Offre
                    </h3>
                    <div className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      {selectedJob.description}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                      <span className="w-1 h-5 bg-blue-600 rounded-full"></span> Compétences requises
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                      {selectedJob.skills.map((skill, i) => (
                        <span key={i} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl shadow-sm hover:border-blue-300 hover:text-blue-600 transition-colors cursor-default">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Bottom Bar */}
          <div className="sticky bottom-6 flex justify-between items-center bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-slate-200 mt-8 z-20">
            <button 
              onClick={() => setView("list")}
              className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-xl transition-colors border border-slate-200"
            >
              Retour à la liste
            </button>
            <div className="flex items-center gap-3">
              <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors border border-slate-200">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
              </button>
              <button 
                disabled={selectedJob.status === "closed"}
                className={`px-8 py-3 text-white text-sm font-bold rounded-xl transition-all shadow-lg flex items-center gap-2 ${
                  selectedJob.status === "closed" 
                  ? "bg-slate-300 cursor-not-allowed shadow-none" 
                  : "bg-blue-600 hover:bg-blue-700 shadow-blue-500/25 hover:scale-105"
                }`}
              >
                {selectedJob.status === "closed" ? "Offre non disponible" : "Postuler maintenant"} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- VUE INFORMATIONS ENTREPRISE --- */}
      {view === "company" && selectedJob && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
            <button onClick={() => setView("list")} className="hover:text-blue-600 transition-colors">Accueil</button>
            <ChevronRight size={14} className="text-slate-400" />
            <button onClick={() => setView("list")} className="hover:text-blue-600 transition-colors">Offres d'emplois</button>
            <ChevronRight size={14} className="text-slate-400" />
            <button onClick={() => setView("detail")} className="hover:text-blue-600 transition-colors">{selectedJob.title}</button>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="text-slate-900 px-2 py-1 bg-slate-100 rounded-md">Profil entreprise</span>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl relative">
            {/* Banner */}
            <div className="h-40 w-full bg-slate-900 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-20"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-80"></div>
            </div>

            <div className="px-8 pb-0 flex flex-col sm:flex-row sm:items-end gap-6 border-b border-slate-100 relative">
              <div className="w-28 h-28 bg-white rounded-2xl border-4 border-white shadow-lg flex items-center justify-center -mt-16 z-10 relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://logo.clearbit.com/${selectedJob.domain}`} alt={selectedJob.company} className="w-20 h-20 object-contain" onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedJob.company)}&background=f8fafc&color=32A8D7&font-size=0.4`; }} />
              </div>
              <div className="pb-4 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">{selectedJob.company}</h2>
                    <p className="text-sm font-medium text-slate-500 mt-1 flex items-center gap-1.5">
                      <Globe size={14} /> {selectedJob.domain}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 border border-slate-200">
                      <Mail size={14} /> Contacter
                    </button>
                    <button className="px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 border border-blue-100">
                      <Link2 size={14} /> Site web
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-8 px-8 pt-8 border-b border-slate-100 bg-slate-50/30">
              <button 
                onClick={() => setCompanyTab("info")}
                className={`pb-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
                  companyTab === "info" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                <Building size={16} /> À propos de l'entreprise
              </button>
              <button 
                onClick={() => setCompanyTab("reseaux")}
                className={`pb-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
                  companyTab === "reseaux" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                <Share2 size={16} /> Réseaux Sociaux
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              {companyTab === "info" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nom de l'entreprise</label>
                    <div className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 font-medium">
                      {selectedJob.company}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Secteur d'activité</label>
                    <div className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 font-medium flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span> Technologies & Logiciels
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Taille de l'entreprise</label>
                    <div className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 font-medium flex items-center gap-2">
                      <Users size={16} className="text-slate-400" /> {selectedJob.employees}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Siège Social</label>
                    <div className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 font-medium flex items-center gap-2">
                      <MapPin size={16} className="text-slate-400" /> {selectedJob.location.split('(')[0].trim()}
                    </div>
                  </div>
                  <div className="space-y-1.5 md:col-span-2 mt-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Description de l'entreprise</label>
                    <div className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 leading-relaxed min-h-[100px]">
                      {selectedJob.company} est une entreprise technologique innovante offrant des solutions de pointe pour le marché africain. Notre mission est de simplifier les opérations quotidiennes grâce à des logiciels robustes et des interfaces intuitives. Nous valorisons la créativité, l'inclusion et l'impact.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Social media inputs disabled with better styling */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">LinkedIn</label>
                    <div className="relative group">
                      <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center bg-slate-100 border-r border-slate-200 rounded-l-xl text-[#0077b5]">
                        <Link2 size={16} />
                      </div>
                      <input type="text" disabled value={`linkedin.com/company/${selectedJob.company.toLowerCase().replace(/[^a-z0-9]/g, '')}`} className="w-full pl-15 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Twitter / X</label>
                    <div className="relative group">
                      <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center bg-slate-100 border-r border-slate-200 rounded-l-xl text-slate-900 font-serif">
                        <span className="text-lg font-black">𝕏</span>
                      </div>
                      <input type="text" disabled value={`twitter.com/${selectedJob.company.toLowerCase().replace(/[^a-z0-9]/g, '')}`} className="w-full pl-15 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Facebook</label>
                    <div className="relative group">
                      <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center bg-slate-100 border-r border-slate-200 rounded-l-xl text-[#1877f2] font-bold text-lg">
                        f
                      </div>
                      <input type="text" disabled value={`facebook.com/${selectedJob.company.toLowerCase().replace(/[^a-z0-9]/g, '')}`} className="w-full pl-15 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium" />
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-10 flex justify-end pt-6 border-t border-slate-100">
                <button 
                  onClick={() => setView("detail")}
                  className="px-6 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-xl transition-colors shadow-sm"
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
