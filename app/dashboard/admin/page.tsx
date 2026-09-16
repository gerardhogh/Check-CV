"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Menu, Bell, ChevronDown, X, LogOut,
  Home, Users, Briefcase, Settings, BarChart2,
  History, Shield, PlusCircle, CheckCircle, AlertCircle,
  MoreHorizontal, TrendingUp, Eye
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from "recharts";

// ── Sidebar ────────────────────────────────────────────────────────────────

const sidebarItems = [
  { href: "/dashboard/admin", icon: Home, label: "Tableau de bord", active: true },
  { href: "/dashboard/admin/talents", icon: Users, label: "Talents" },
  { href: "/dashboard/admin/recruteurs", icon: Briefcase, label: "Recruteurs" },
  { href: "/dashboard/admin/emplois", icon: Briefcase, label: "Offres d'emploi" },
  { href: "/dashboard/admin/transactions", icon: History, label: "Transactions" },
  { href: "/dashboard/admin/parametres", icon: Settings, label: "Paramètres" },
];

function AdminSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user, logout } = useAuth();
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={onClose} />}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-40
          w-64 min-h-screen bg-white border-r border-slate-200
          flex flex-col transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <Link href="/" className="block">
            <div className="relative h-9 w-36">
              <Image
                src="/assets/CC blue png horiz 1.png"
                alt="Check CV Logo"
                fill
                className="object-contain object-left"
              />
            </div>
          </Link>
          <button onClick={onClose} className="md:hidden text-slate-400"><X size={18} /></button>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map(({ href, icon: Icon, label, active }) => (
            <Link key={href} href={href} className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${active ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}>
              <Icon size={18} /> {label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-10 h-10 rounded-full overflow-hidden relative border border-slate-200 flex-shrink-0">
              <Image
                src={user?.avatar || "/assets/Avatar ByeWind.png"}
                alt="Admin Avatar"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate">{user?.name || "Admin"}</p>
              <p className="text-[11px] text-slate-400 truncate">{user?.email || "admin@check.cv"}</p>
            </div>
            <button onClick={logout} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="Se déconnecter">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────

const globalStats = [
  { label: "Nombre total de talents inscrits", value: "2345", color: "#1e8ae9", action: "Voir tout", href: "/dashboard/admin/talents" },
  { label: "Nombre total de recruteurs inscrits", value: "2345", color: "#22c55e", action: "Voir tout", href: "/dashboard/admin/recruteurs" },
  { label: "Nombre total d'offres publiées", value: "2345", color: "#ec4899", action: "Voir tout", href: "/dashboard/admin/emplois" },
  { label: "Nombre total de vidéos d'entretien soumises", value: "2345", color: "#f59e0b", action: "Voir tout", href: "/dashboard/admin/talents" },
  { label: "Nombre total de candidatures", value: "2345", color: "#1e8ae9", action: "Voir tout", href: "/dashboard/admin/emplois" },
];

const jobsData = [
  { title: "Designer UI/UX", company: "GRAND-G", location: "Cotonou", category: "Temps plein", candidatures: 135, date: "18 avril 2025 - 14h 30", status: "Actif" },
  { title: "Développeur Full Stack", company: "GRAND-G", location: "Cotonou", category: "Stage", candidatures: 135, date: "18 avril 2025 - 14h 30", status: "Inactif" },
  { title: "Community manager", company: "GRAND-G", location: "Cotonou", category: "Freelance", candidatures: 135, date: "18 avril 2025 - 14h 30", status: "Actif" },
  { title: "Développeur Full Stack", company: "GRAND-G", location: "Cotonou", category: "Stage", candidatures: 135, date: "18 avril 2025 - 14h 30", status: "Inactif" },
  { title: "Graphiste", company: "GRAND-G", location: "Cotonou", category: "Temps plein", candidatures: 135, date: "18 avril 2025 - 14h 30", status: "Actif" },
];

const lineData = [
  { name: "Jan", Talents: 150, Recruteurs: 30 },
  { name: "Fév", Talents: 140, Recruteurs: 45 },
  { name: "Mar", Talents: 175, Recruteurs: 55 },
  { name: "Avr", Talents: 160, Recruteurs: 50 },
  { name: "Mai", Talents: 185, Recruteurs: 65 },
  { name: "Juin", Talents: 170, Recruteurs: 60 },
];

const pieData = [
  { name: "CDI", value: 45, color: "#86efac" },
  { name: "Stage", value: 25, color: "#bfdbfe" },
  { name: "Freelance", value: 20, color: "#fdba74" },
  { name: "CDD", value: 10, color: "#f9a8d4" },
];

const barData = [
  { name: "Jan", value: 40 },
  { name: "Fév", value: 130 },
  { name: "Mar", value: 120 },
  { name: "Avr", value: 140 },
  { name: "Mai", value: 175 },
  { name: "Juin", value: 180 },
];

const popularOffers = [
  { name: "Dev Fullstack", value: 135 },
  { name: "Designer UI/UX", value: 120 },
  { name: "Chef de projet", value: 90 },
  { name: "Graphiste", value: 110 },
  { name: "Community manager", value: 45 },
];

// ── Page ───────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [jobs, setJobs] = useState(jobsData);
  const { user, logout } = useAuth();

  const toggleStatus = (i: number) => {
    setJobs(prev => prev.map((j, idx) => idx === i ? { ...j, status: j.status === "Actif" ? "Inactif" : "Actif" } : j));
  };
  const deleteJob = (i: number) => {
    setJobs(prev => prev.filter((_, idx) => idx !== i));
  };

  return (
    <div className="flex min-h-screen" style={{ background: "#edeeef" }}>
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="text-slate-500 hover:text-slate-700 p-1 md:hidden" id="sidebar-toggle-admin" aria-label="Menu">
              <Menu size={22} />
            </button>
            <h1 className="text-xl font-normal text-slate-700">
              Dashboard <span className="font-extrabold text-slate-900">Admin</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-slate-500 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors" aria-label="Notifications">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 transition-colors"
                id="profile-menu-admin"
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
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-30 animate-fade-in">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-800 truncate">{user?.name || "Admin"}</p>
                    <p className="text-[11px] text-slate-400 truncate">{user?.email || "admin@check.cv"}</p>
                  </div>
                  <Link href="/dashboard/admin/parametres" className="block px-4 py-2 text-xs text-slate-600 hover:bg-slate-50 font-medium">
                    Paramètres
                  </Link>
                  <button onClick={logout} className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 font-semibold border-t border-slate-100 mt-1">
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-5 space-y-5">

          {/* Global stats */}
          <div className="card p-5">
            <h2 className="font-bold text-slate-800 text-base mb-4">Statistiques globales</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {globalStats.map((stat, i) => (
                <div key={i} className="rounded-xl border border-slate-100 p-4 flex flex-col justify-between">
                  <p className="text-xs text-slate-500 leading-snug mb-2">{stat.label}</p>
                  <p className="text-3xl font-black text-slate-800 mb-3">{stat.value}</p>
                  <Link
                    href={stat.href}
                    className="text-xs text-white font-semibold px-3 py-1.5 rounded-lg inline-block text-center"
                    style={{ background: stat.color }}
                    id={`stat-voir-${i}`}
                  >
                    {stat.action}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Jobs table */}
          <div className="card p-5 overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-800">Offres d'emploi récentes</h2>
              <Link href="/dashboard/admin/emplois" className="btn-primary text-sm px-4 py-2" id="btn-tout-voir-emplois">Tout voir</Link>
            </div>
            <table className="table-custom w-full">
              <thead>
                <tr>
                  <th>Titre du poste</th>
                  <th>Recruteurs</th>
                  <th>Lieu</th>
                  <th>Catégorie</th>
                  <th>Candidatures</th>
                  <th>Date de publication</th>
                  <th>Statut</th>
                  <th>Actions admin</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job, i) => (
                  <tr key={i}>
                    <td className="font-medium">{job.title}</td>
                    <td>{job.company}</td>
                    <td>{job.location}</td>
                    <td>{job.category}</td>
                    <td>{job.candidatures}</td>
                    <td className="text-slate-400">{job.date}</td>
                    <td>
                      <span
                        className={`badge ${job.status === "Actif" ? "badge-green" : "badge-yellow"}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full mr-1 inline-block ${job.status === "Actif" ? "bg-green-500" : "bg-yellow-500"}`}></span>
                        {job.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex flex-col gap-0.5">
                        {job.status === "Actif" ? (
                          <>
                            <button className="text-xs text-left text-green-600 hover:underline">Approuver</button>
                            <button className="text-xs text-left text-blue-600 hover:underline">Modifier</button>
                            <button onClick={() => toggleStatus(i)} className="text-xs text-left text-orange-500 hover:underline">Suspendre</button>
                            <button onClick={() => deleteJob(i)} className="text-xs text-left text-red-500 hover:underline">Supprimer</button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => toggleStatus(i)} className="text-xs text-left text-blue-600 hover:underline">Activer</button>
                            <button onClick={() => deleteJob(i)} className="text-xs text-left text-red-500 hover:underline">Supprimer</button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Charts row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Line chart */}
            <div className="card p-5">
              <h3 className="font-bold text-slate-800 mb-4">Inscriptions mensuelles</h3>
              <div className="flex items-center gap-4 mb-3">
                <span className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span className="w-3 h-1 rounded-full bg-blue-500 inline-block"></span> Talents
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span className="w-3 h-1 rounded-full bg-pink-400 inline-block"></span> Recruteurs
                </span>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="Talents" stroke="#1e8ae9" strokeWidth={2} dot={{ r: 4, fill: "#1e8ae9" }} />
                  <Line type="monotone" dataKey="Recruteurs" stroke="#ec4899" strokeWidth={2} dot={{ r: 4, fill: "#ec4899" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Pie chart */}
            <div className="card p-5">
              <h3 className="font-bold text-slate-800 mb-4">Répartition des contrats</h3>
              <div className="flex items-center gap-8">
                <ResponsiveContainer width="55%" height={200}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" startAngle={90} endAngle={-270}>
                      {pieData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => `${v}%`} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2">
                  {pieData.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: entry.color }}></span>
                      <span className="text-sm text-slate-600">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Charts row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Bar chart */}
            <div className="card p-5">
              <h3 className="font-bold text-slate-800 mb-4">Taux d'activité mensuelle</h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#bfdbfe" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Popular offers */}
            <div className="card p-5">
              <h3 className="font-bold text-slate-800 mb-4">Offres populaires</h3>
              <div className="space-y-3">
                {popularOffers.map((offer) => (
                  <div key={offer.name} className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 w-28 flex-shrink-0 text-right">{offer.name}</span>
                    <div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${(offer.value / 140) * 100}%`, background: "#fca5a5" }}
                      />
                    </div>
                    <span className="text-xs text-slate-500 w-6 flex-shrink-0">{offer.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="card p-5">
              <PlusCircle size={22} className="mb-3" style={{ color: "#1e8ae9" }} />
              <h3 className="font-bold text-slate-800 mb-1">Créer un emploi</h3>
              <p className="text-sm text-slate-400 mb-4">Créer un emploi, changer des vies certainement.</p>
              <Link href="/dashboard/admin/emplois" className="btn-primary w-full justify-center flex items-center gap-2" id="btn-admin-creer-emploi">
                <PlusCircle size={16} /> Commencer
              </Link>
            </div>
            <div className="card p-5">
              <Settings size={22} className="mb-3" style={{ color: "#1e8ae9" }} />
              <h3 className="font-bold text-slate-800 mb-1">Paramètres</h3>
              <p className="text-sm text-slate-400 mb-4">Gérez vos préférences et votre compte</p>
              <Link href="/dashboard/admin/parametres" className="btn-primary w-full justify-center flex items-center gap-2" id="btn-admin-parametres">
                <Settings size={16} /> Accéder
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
