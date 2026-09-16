"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Menu,
  Bell,
  ChevronDown,
  Briefcase,
  Bookmark,
  Share2,
  Settings,
  LogOut,
  Home,
  Users,
  Search,
  X,
  PlusCircle,
  CheckCircle,
  Trash2,
  Copy,
} from "lucide-react";

type RecruiterTab =
  | "dashboard"
  | "talents"
  | "candidatures"
  | "emplois"
  | "favoris"
  | "affiliation"
  | "parametres";

export default function RecruteurDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<RecruiterTab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal: Créer un emploi
  const [createJobModalOpen, setCreateJobModalOpen] = useState(false);
  const [newJobTitle, setNewJobTitle] = useState("");
  const [newJobType, setNewJobType] = useState("Temps plein");
  const [newJobLocation, setNewJobLocation] = useState("Cotonou, Bénin");
  const [newJobSalary, setNewJobSalary] = useState("450 000 - 650 000 FCFA");
  const [newJobDesc, setNewJobDesc] = useState("");

  // Recruiter editable info
  const [companyName, setCompanyName] = useState(user?.company || "Grand-G Corp");
  const [companyEmail, setCompanyEmail] = useState(user?.email || "recruteur@grand-g.com");
  const [companySector, setCompanySector] = useState("Technologies & Informatique");
  const [companyBio, setCompanyBio] = useState(
    "Entreprise panafricaine spécialisée dans les solutions digitales et le développement de logiciels."
  );

  // Search Talents State
  const [talentSearchQuery, setTalentSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>(["t1", "t3"]);

  // All jobs created by recruiter
  const [myJobs, setMyJobs] = useState([
    {
      id: "j1",
      title: "Développeur Front-end",
      location: "Cotonou, Bénin",
      type: "Temps plein",
      salary: "500 000 FCFA",
      candidatures: 12,
      active: true,
    },
    {
      id: "j2",
      title: "Designer UI/UX",
      location: "Abidjan, Côte d'Ivoire",
      type: "Hybride",
      salary: "450 000 FCFA",
      candidatures: 8,
      active: true,
    },
    {
      id: "j3",
      title: "Chef de Projet Digital",
      location: "Dakar, Sénégal",
      type: "Temps plein",
      salary: "700 000 FCFA",
      candidatures: 5,
      active: true,
    },
  ]);

  // Candidatures list
  const [candidatures, setCandidatures] = useState([
    {
      id: "c1",
      name: "Jules Kofi",
      role: "Développeur Front-end",
      stars: 5,
      hasVideo: true,
      appliedAt: "Aujourd'hui à 11:30",
      status: "En attente",
      avatar: "/assets/Avatar ByeWind.png",
    },
    {
      id: "c2",
      name: "Amina Diallo",
      role: "Designer UI/UX",
      stars: 4,
      hasVideo: true,
      appliedAt: "Hier à 16:45",
      status: "Retenu",
      avatar: "/assets/Avatar ByeWind1.png",
    },
    {
      id: "c3",
      name: "Marc Lawson",
      role: "Chef de Projet Digital",
      stars: 3,
      hasVideo: false,
      appliedAt: "Il y a 3 jours",
      status: "En attente",
      avatar: "/assets/Avatar ByeWind.png",
    },
  ]);

  // Talents pool
  const talentPool = [
    {
      id: "t1",
      name: "Jules Kofi",
      title: "Développeur Full-Stack & UI/UX",
      location: "Cotonou, Bénin",
      stars: 5,
      hasVideo: true,
      avatar: "/assets/Avatar ByeWind.png",
    },
    {
      id: "t2",
      name: "Amina Diallo",
      title: "Product Designer Senior",
      location: "Abidjan, Côte d'Ivoire",
      stars: 4,
      hasVideo: true,
      avatar: "/assets/Avatar ByeWind1.png",
    },
    {
      id: "t3",
      name: "Christian Dossou",
      title: "Data Scientist & IA",
      location: "Dakar, Sénégal",
      stars: 5,
      hasVideo: true,
      avatar: "/assets/Avatar ByeWind.png",
    },
    {
      id: "t4",
      name: "Béatrice Mensah",
      title: "Développeuse Mobile Flutter",
      location: "Lomé, Togo",
      stars: 4,
      hasVideo: false,
      avatar: "/assets/Avatar ByeWind1.png",
    },
  ];

  // Notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "Jules Kofi a postulé à votre offre 'Développeur Front-end'",
      time: "Il y a 25 min",
      read: false,
    },
    {
      id: 2,
      text: "3 nouveaux profils étoilés correspondent à votre recherche",
      time: "Il y a 3h",
      read: false,
    },
    {
      id: 3,
      text: "Votre offre 'Designer UI/UX' a atteint 8 candidatures",
      time: "Hier",
      read: true,
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((f) => f !== id));
      showToast("Profil retiré des favoris.");
    } else {
      setFavorites([...favorites, id]);
      showToast("Profil ajouté aux favoris !");
    }
  };

  const handleUpdateCandidatureStatus = (
    cId: string,
    status: "Retenu" | "Refusé"
  ) => {
    setCandidatures(
      candidatures.map((c) => (c.id === cId ? { ...c, status } : c))
    );
    showToast(`Statut du candidat mis à jour : ${status}`);
  };

  const handleCreateJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobTitle.trim()) return;

    const created = {
      id: "j_" + Date.now(),
      title: newJobTitle,
      location: newJobLocation,
      type: newJobType,
      salary: newJobSalary,
      candidatures: 0,
      active: true,
    };

    setMyJobs([created, ...myJobs]);
    setCreateJobModalOpen(false);
    setNewJobTitle("");
    setNewJobDesc("");
    showToast(`Offre "${created.title}" publiée avec succès !`);
    setActiveTab("emplois");
  };

  const handleDeleteJob = (jobId: string) => {
    setMyJobs(myJobs.filter((j) => j.id !== jobId));
    showToast("Offre d'emploi supprimée.");
  };

  const sidebarItems = [
    { key: "dashboard" as RecruiterTab, icon: Home, label: "Tableau de bord" },
    { key: "talents" as RecruiterTab, icon: Search, label: "Recherche talents" },
    { key: "candidatures" as RecruiterTab, icon: Users, label: "Candidatures" },
    { key: "emplois" as RecruiterTab, icon: Briefcase, label: "Mes emplois" },
    { key: "favoris" as RecruiterTab, icon: Bookmark, label: "Favoris" },
    { key: "affiliation" as RecruiterTab, icon: Share2, label: "Affiliation" },
    { key: "parametres" as RecruiterTab, icon: Settings, label: "Paramètres" },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex min-h-screen bg-[#f1f5f9] text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-sm animate-fade-in border border-slate-700">
          <CheckCircle size={18} className="text-green-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-xs"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 z-40
          w-64 h-screen overflow-hidden bg-white border-r border-slate-200
          flex flex-col justify-between transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0">
            <Link href="/" className="block">
              <div className="relative h-9 w-36">
                <Image
                  src="/assets/CC blue png horiz 1.png"
                  alt="Check CV Logo"
                  fill
                  priority
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-slate-400 hover:text-slate-600 p-1"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
            {sidebarItems.map(({ key, icon: Icon, label }) => {
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setActiveTab(key);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 translate-x-1"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  <span className="whitespace-nowrap text-sm font-medium">{label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* ── MAIN CONTENT AREA ── */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-slate-600 hover:text-slate-900 p-1 md:hidden"
            >
              <Menu size={22} />
            </button>
            <div>
              <h1 className="text-xl font-normal text-slate-700 leading-tight">
                Tableau de{" "}
                <span className="font-extrabold text-slate-900">bord</span>
              </h1>
              <p className="text-[11px] text-slate-400 font-medium">
                Espace Entreprise & Recrutement • {companyName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotifMenuOpen(!notifMenuOpen);
                  setProfileMenuOpen(false);
                }}
                className="relative text-slate-500 hover:text-slate-800 p-2.5 rounded-full hover:bg-slate-100 transition-colors"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifMenuOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-3xl shadow-2xl border border-slate-100 py-3 z-30 animate-fade-in">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-800">
                      Notifications ({unreadCount})
                    </p>
                    <button
                      onClick={() =>
                        setNotifications(notifications.map((n) => ({ ...n, read: true })))
                      }
                      className="text-[10px] text-blue-600 hover:underline font-semibold"
                    >
                      Tout marquer comme lu
                    </button>
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-slate-50">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-3 text-xs hover:bg-slate-50 transition-colors ${
                          !notif.read ? "bg-blue-50/40" : ""
                        }`}
                      >
                        <p className="text-slate-800 font-medium leading-snug">
                          {notif.text}
                        </p>
                        <span className="text-[10px] text-slate-400 mt-1 block">
                          {notif.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setProfileMenuOpen(!profileMenuOpen);
                  setNotifMenuOpen(false);
                }}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 transition-colors"
              >
                <div className="w-9 h-9 rounded-full overflow-hidden relative border border-slate-200">
                  <Image
                    src={user?.avatar || "/assets/Avatar ByeWind.png"}
                    alt="Avatar"
                    width={36}
                    height={36}
                    className="object-cover"
                  />
                </div>
                <ChevronDown size={14} className="text-slate-400" />
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 mt-3 w-52 bg-white rounded-3xl shadow-2xl border border-slate-100 py-2 z-30 animate-fade-in">
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-800 truncate">
                      {companyName}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">
                      {companyEmail}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab("emplois");
                      setProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-600 hover:bg-slate-50 font-medium flex items-center gap-2"
                  >
                    <Briefcase size={14} /> Mes Emplois
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("parametres");
                      setProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-600 hover:bg-slate-50 font-medium flex items-center gap-2"
                  >
                    <Settings size={14} /> Paramètres
                  </button>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 font-semibold border-t border-slate-100 mt-1 flex items-center gap-2"
                  >
                    <LogOut size={14} /> Déconnexion
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ── CONTENT BY ACTIVE TAB ── */}
        <main className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* TAB: DASHBOARD */}
          {activeTab === "dashboard" && (
            <>
              {/* Row 1 – Candidatures, Favoris, Affiliation */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-slate-800 text-sm">
                        Candidatures
                      </h3>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-600">
                        {candidatures.length} reçues
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                      Candidatures reçues : Votre futur talent est ici !
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("candidatures")}
                    className="w-full py-3 rounded-2xl font-bold text-xs text-white bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Users size={15} /> Voir les candidatures
                  </button>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-slate-800 text-sm">Favoris</h3>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-600">
                        {favorites.length} sauvegardés
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                      Liste de vos profils favoris sauvegardés pour vos besoins.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("favoris")}
                    className="w-full py-3 rounded-2xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Bookmark size={15} /> Voir les favoris
                  </button>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-slate-800 text-sm">
                        Affiliation
                      </h3>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-50 text-green-600">
                        4 filleuls
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                      Vous avez parrainé 4 entreprises et talents au total.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("affiliation")}
                    className="w-full py-3 rounded-2xl font-bold text-xs text-white bg-[#005a82] hover:bg-[#004766] shadow-lg shadow-blue-900/15 transition-all flex items-center justify-center gap-2"
                  >
                    <Share2 size={15} /> Voir les détails
                  </button>
                </div>
              </div>

              {/* Row 2 – Emplois créés */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/50">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">
                      Emplois créés
                    </h3>
                    <p className="text-xs text-slate-400">
                      Gérez les offres d'emploi actives de votre entreprise
                    </p>
                  </div>
                  <span className="text-xs font-bold px-3.5 py-1 rounded-full bg-slate-100 text-slate-700">
                    {myJobs.length} offres actives
                  </span>
                </div>
                <div className="space-y-3 mb-5">
                  {myJobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-4 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-slate-800 text-sm">
                            {job.title}
                          </p>
                          <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full">
                            Actif
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {job.location} • {job.type} • {job.candidatures}{" "}
                          candidatures reçues
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setActiveTab("candidatures")}
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                        >
                          Voir candidats ({job.candidatures})
                        </button>
                        <button
                          onClick={() => handleDeleteJob(job.id)}
                          className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                          title="Supprimer l'offre"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setActiveTab("emplois")}
                  className="w-full py-3.5 rounded-2xl font-bold text-xs text-white bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <Briefcase size={16} /> Voir toutes les offres d'emplois créés
                </button>
              </div>

              {/* Row 3 – Quick actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm mb-1">
                      Créer un emploi
                    </h3>
                    <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                      Publiez un poste et commencez à recevoir des profils certifiés
                    </p>
                  </div>
                  <button
                    onClick={() => setCreateJobModalOpen(true)}
                    className="w-full py-3 rounded-2xl font-bold text-xs text-white bg-[#0071a2] hover:bg-[#005c84] shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <PlusCircle size={15} /> Commencer
                  </button>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm mb-1">
                      Paramètres
                    </h3>
                    <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                      Gérez vos préférences de recrutement et votre profil entreprise
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("parametres")}
                    className="w-full py-3 rounded-2xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Settings size={15} /> Accéder
                  </button>
                </div>
              </div>
            </>
          )}

          {/* TAB: RECHERCHE TALENTS */}
          {activeTab === "talents" && (
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Vivier de Talents Certifiés
                  </h2>
                  <p className="text-xs text-slate-400">
                    Recherchez parmi des milliers de profils vérifiés avec notation IA
                  </p>
                </div>
                <div className="relative w-full sm:w-72">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Compétences, poste, pays..."
                    value={talentSearchQuery}
                    onChange={(e) => setTalentSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {talentPool
                  .filter(
                    (t) =>
                      t.name.toLowerCase().includes(talentSearchQuery.toLowerCase()) ||
                      t.title.toLowerCase().includes(talentSearchQuery.toLowerCase()) ||
                      t.location.toLowerCase().includes(talentSearchQuery.toLowerCase())
                  )
                  .map((talent) => {
                    const isFav = favorites.includes(talent.id);
                    return (
                      <div
                        key={talent.id}
                        className="p-5 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/15 transition-all flex items-start gap-4"
                      >
                        <div className="w-14 h-14 rounded-full overflow-hidden relative border border-slate-200 flex-shrink-0">
                          <Image
                            src={talent.avatar}
                            alt={talent.name}
                            width={56}
                            height={56}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-bold text-slate-900 text-sm truncate">
                              {talent.name}
                            </h3>
                            <button
                              onClick={() => toggleFavorite(talent.id)}
                              className={`p-1.5 rounded-full ${
                                isFav ? "text-amber-500" : "text-slate-300 hover:text-slate-500"
                              }`}
                            >
                              <Bookmark size={18} fill={isFav ? "currentColor" : "none"} />
                            </button>
                          </div>
                          <p className="text-xs font-semibold text-blue-600 truncate">
                            {talent.title}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            {talent.location}
                          </p>
                          <div className="flex items-center gap-2 mt-3">
                            <span className="text-xs text-amber-500 font-bold">
                              ★ {talent.stars}.0
                            </span>
                            {talent.hasVideo && (
                              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                                Vidéo IA validée
                              </span>
                            )}
                          </div>
                          <div className="flex gap-2 mt-4">
                            <button
                              onClick={() =>
                                showToast(`Profil de ${talent.name} ouvert pour consultation.`)
                              }
                              className="btn-primary text-xs py-1.5 px-3 flex-1 justify-center"
                            >
                              Voir le profil
                            </button>
                            <button
                              onClick={() =>
                                showToast(`Message envoyé à ${talent.name} !`)
                              }
                              className="btn-outline text-xs py-1.5 px-3"
                            >
                              Contacter
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* TAB: CANDIDATURES */}
          {activeTab === "candidatures" && (
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Candidatures Reçues
                  </h2>
                  <p className="text-xs text-slate-400">
                    Évaluez les candidats certifiés ayant postulé à vos offres
                  </p>
                </div>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {candidatures.length} candidatures
                </span>
              </div>

              <div className="space-y-4">
                {candidatures.map((cand) => (
                  <div
                    key={cand.id}
                    className="p-5 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/15 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden relative border border-slate-200 flex-shrink-0">
                        <Image
                          src={cand.avatar}
                          alt={cand.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">
                          {cand.name}
                        </h3>
                        <p className="text-xs text-blue-600 font-semibold">
                          Postule pour : {cand.role}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Postulé {cand.appliedAt} • Score IA : ★ {cand.stars}.0
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          cand.status === "Retenu"
                            ? "bg-green-100 text-green-700"
                            : cand.status === "Refusé"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {cand.status}
                      </span>
                      <button
                        onClick={() =>
                          handleUpdateCandidatureStatus(cand.id, "Retenu")
                        }
                        className="btn-primary text-xs py-1.5 px-3"
                      >
                        Retenir
                      </button>
                      <button
                        onClick={() =>
                          handleUpdateCandidatureStatus(cand.id, "Refusé")
                        }
                        className="btn-outline text-xs py-1.5 px-3 text-red-500 hover:bg-red-50"
                      >
                        Refuser
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: MES EMPLOIS */}
          {activeTab === "emplois" && (
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Mes Offres d'Emploi
                  </h2>
                  <p className="text-xs text-slate-400">
                    Gérez et publiez vos opportunités d'embauche
                  </p>
                </div>
                <button
                  onClick={() => setCreateJobModalOpen(true)}
                  className="btn-primary text-xs px-5 py-2.5 rounded-full flex items-center gap-2"
                >
                  <PlusCircle size={16} /> Publier une offre
                </button>
              </div>

              <div className="space-y-3">
                {myJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-5 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 text-base">
                          {job.title}
                        </h3>
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                          {job.type}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        {job.location} • Rémunération :{" "}
                        <span className="font-bold text-slate-800">
                          {job.salary}
                        </span>{" "}
                        • {job.candidatures} candidatures
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveTab("candidatures")}
                        className="btn-primary text-xs py-2 px-4"
                      >
                        Voir candidats ({job.candidatures})
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: FAVORIS */}
          {activeTab === "favoris" && (
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl space-y-6">
              <div className="pb-4 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-900">
                  Talents Favoris
                </h2>
                <p className="text-xs text-slate-400">
                  Profils sauvegardés pour vos prochains recrutements
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {talentPool
                  .filter((t) => favorites.includes(t.id))
                  .map((talent) => (
                    <div
                      key={talent.id}
                      className="p-5 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all flex items-start gap-4"
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden relative border border-slate-200 flex-shrink-0">
                        <Image
                          src={talent.avatar}
                          alt={talent.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-900 text-sm">
                          {talent.name}
                        </h3>
                        <p className="text-xs text-blue-600 font-semibold truncate">
                          {talent.title}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {talent.location}
                        </p>
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() =>
                              showToast(`Contact enclenché avec ${talent.name}`)
                            }
                            className="btn-primary text-xs py-1.5 px-3 flex-1 justify-center"
                          >
                            Contacter
                          </button>
                          <button
                            onClick={() => toggleFavorite(talent.id)}
                            className="btn-outline text-xs py-1.5 px-3 text-red-500"
                          >
                            Retirer
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB: AFFILIATION */}
          {activeTab === "affiliation" && (
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Affiliation Recruteur
                  </h2>
                  <p className="text-xs text-slate-400">
                    Recommandez Check CV à d'autres entreprises et talents
                  </p>
                </div>
                <span className="text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                  Bonus accumulés : 20 000 FCFA
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-700 to-sky-600 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                <div>
                  <h3 className="font-extrabold text-lg mb-1">
                    Lien Recruteur Exclusif
                  </h3>
                  <p className="text-xs text-blue-100">
                    Gagnez des crédits de publication et des bonus sur chaque compte créé.
                  </p>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "https://checkcv.com/inscription?ref=GRANDG-RECRUIT"
                    );
                    showToast("Lien d'affiliation copié !");
                  }}
                  className="px-6 py-3 rounded-full font-bold text-xs bg-white text-blue-800 hover:bg-blue-50 transition-all shadow-lg flex items-center gap-2"
                >
                  <Copy size={16} /> Copier le lien recruteur
                </button>
              </div>
            </div>
          )}

          {/* TAB: PARAMETRES */}
          {activeTab === "parametres" && (
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl space-y-6">
              <div className="pb-4 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-900">
                  Paramètres Entreprise
                </h2>
                <p className="text-xs text-slate-400">
                  Gérez les informations visibles sur vos offres d'emploi
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  showToast("Informations de l'entreprise enregistrées !");
                }}
                className="space-y-4 max-w-xl"
              >
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Nom de l'entreprise
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Email de contact
                  </label>
                  <input
                    type="email"
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Secteur d'activité
                  </label>
                  <input
                    type="text"
                    value={companySector}
                    onChange={(e) => setCompanySector(e.target.value)}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Présentation de l'entreprise
                  </label>
                  <textarea
                    rows={3}
                    value={companyBio}
                    onChange={(e) => setCompanyBio(e.target.value)}
                    className="input-field"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary px-8 py-3 rounded-xl text-xs font-bold shadow-lg shadow-blue-500/20"
                >
                  Enregistrer les modifications
                </button>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* ── MODAL: CRÉER UN EMPLOI ── */}
      {createJobModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                Publier une offre d'emploi
              </h3>
              <button
                onClick={() => setCreateJobModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateJobSubmit} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Titre du poste
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Développeur Full-Stack Node/React"
                  value={newJobTitle}
                  onChange={(e) => setNewJobTitle(e.target.value)}
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Type de contrat
                  </label>
                  <select
                    value={newJobType}
                    onChange={(e) => setNewJobType(e.target.value)}
                    className="input-field"
                  >
                    <option>Temps plein</option>
                    <option>Temps partiel</option>
                    <option>Freelance</option>
                    <option>Stage</option>
                    <option>Hybride</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Lieu
                  </label>
                  <input
                    type="text"
                    required
                    value={newJobLocation}
                    onChange={(e) => setNewJobLocation(e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Fourchette de rémunération
                </label>
                <input
                  type="text"
                  value={newJobSalary}
                  onChange={(e) => setNewJobSalary(e.target.value)}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Description & Profil recherché
                </label>
                <textarea
                  rows={3}
                  placeholder="Compétences requises, missions clés..."
                  value={newJobDesc}
                  onChange={(e) => setNewJobDesc(e.target.value)}
                  className="input-field"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCreateJobModalOpen(false)}
                  className="btn-outline flex-1 justify-center py-2.5 text-xs"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1 justify-center py-2.5 text-xs"
                >
                  Publier l'offre
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
