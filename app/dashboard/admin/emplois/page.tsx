"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  Menu, Bell, ChevronDown, X, LogOut, Home, Users, Briefcase,
  Settings, History, Search, Eye, Ban, Trash2, PlusCircle
} from "lucide-react";

const sidebarItems = [
  { href: "/dashboard/admin", icon: Home, label: "Tableau de bord" },
  { href: "/dashboard/admin/talents", icon: Users, label: "Talents" },
  { href: "/dashboard/admin/recruteurs", icon: Briefcase, label: "Recruteurs" },
  { href: "/dashboard/admin/emplois", icon: Briefcase, label: "Offres d'emploi", active: true },
  { href: "/dashboard/admin/transactions", icon: History, label: "Transactions" },
  { href: "/dashboard/admin/parametres", icon: Settings, label: "Paramètres" },
];

const emplois = [
  { id: 1, title: "Designer UI/UX", company: "Grand-G", location: "Cotonou", category: "Temps plein", candidatures: 135, date: "18 Avr 2025", status: "Actif" },
  { id: 2, title: "Développeur Full Stack", company: "Grand-G", location: "Cotonou", category: "Stage", candidatures: 89, date: "15 Avr 2025", status: "Inactif" },
  { id: 3, title: "Community Manager", company: "TechSenegal", location: "Dakar", category: "Freelance", candidatures: 47, date: "10 Avr 2025", status: "Actif" },
  { id: 4, title: "Chef de Projet IT", company: "Afrique Talent", location: "Abidjan", category: "CDI", candidatures: 210, date: "5 Avr 2025", status: "Actif" },
  { id: 5, title: "Graphiste", company: "Grand-G", location: "Cotonou", category: "Temps plein", candidatures: 63, date: "28 Mar 2025", status: "Inactif" },
];

export default function AdminEmplois() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState(emplois);
  const { user, logout } = useAuth();

  const filtered = jobs.filter(j =>
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.company.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id: number) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, status: j.status === "Actif" ? "Inactif" : "Actif" } : j));
  };

  const deleteJob = (id: number) => {
    setJobs(prev => prev.filter(j => j.id !== id));
  };

  return (
    <div className="flex min-h-screen" style={{ background: "#edeeef" }}>
      {sidebarOpen && <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />}
      <aside className={`fixed md:static inset-y-0 left-0 z-40 w-64 min-h-screen bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <Link href="/" className="block">
            <div className="relative h-9 w-36">
              <Image src="/assets/CC blue png horiz 1.png" alt="Check CV" fill className="object-contain object-left" />
            </div>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-slate-400"><X size={18} /></button>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map(({ href, icon: Icon, label, active }) => (
            <Link key={href} href={href} className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${active ? "bg-[#32A8D7] text-white shadow-md" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}>
              <Icon size={18} /> {label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-10 h-10 rounded-full overflow-hidden relative border border-slate-200 flex-shrink-0">
              <Image src={user?.avatar || "/assets/Avatar ByeWind.png"} alt="Avatar" width={40} height={40} className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate">{user?.name || "Admin"}</p>
              <p className="text-[11px] text-slate-400 truncate">{user?.email || "admin@check.cv"}</p>
            </div>
            <button onClick={logout} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"><LogOut size={16} /></button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="text-slate-500 md:hidden"><Menu size={22} /></button>
            <h1 className="text-xl font-normal text-slate-700">Dashboard <span className="font-extrabold text-slate-900">Admin</span></h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-slate-500 p-2 rounded-full hover:bg-slate-100 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="relative">
              <button onClick={() => setProfileMenuOpen(!profileMenuOpen)} className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 transition-colors">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200">
                  <Image src={user?.avatar || "/assets/Avatar ByeWind.png"} alt="Avatar" width={36} height={36} className="object-cover" />
                </div>
                <ChevronDown size={14} className="text-slate-400" />
              </button>
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-30">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-800 truncate">{user?.name || "Admin"}</p>
                    <p className="text-[11px] text-slate-400 truncate">{user?.email || "admin@check.cv"}</p>
                  </div>
                  <Link href="/dashboard/admin/parametres" className="block px-4 py-2 text-xs text-slate-600 hover:bg-slate-50 font-medium">Paramètres</Link>
                  <button onClick={logout} className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 font-semibold border-t border-slate-100 mt-1">Déconnexion</button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-5 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-slate-900">Gestion des Offres d'emploi</h2>
              <p className="text-sm text-slate-500">{filtered.length} offre(s)</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#32A8D7] w-56"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-[#32A8D7] text-white text-sm font-bold rounded-xl hover:bg-[#288eb8] transition-colors shadow-md shadow-blue-500/20">
                <PlusCircle size={16} /> Créer une offre
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    {["Titre du poste", "Entreprise", "Lieu", "Catégorie", "Candidatures", "Date", "Statut", "Actions"].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map(job => (
                    <tr key={job.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-slate-900 whitespace-nowrap">{job.title}</td>
                      <td className="px-4 py-3 text-slate-500">{job.company}</td>
                      <td className="px-4 py-3 text-slate-500">{job.location}</td>
                      <td className="px-4 py-3 text-slate-500">{job.category}</td>
                      <td className="px-4 py-3 text-center font-bold text-slate-700">{job.candidatures}</td>
                      <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">{job.date}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => toggleStatus(job.id)} className={`px-2.5 py-1 rounded-full text-xs font-bold transition-colors ${job.status === "Actif" ? "bg-green-50 text-green-700 hover:bg-green-100" : "bg-orange-50 text-orange-700 hover:bg-orange-100"}`}>
                          {job.status}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button title="Voir" className="p-1.5 rounded-lg text-slate-400 hover:text-[#32A8D7] hover:bg-blue-50 transition-colors"><Eye size={14} /></button>
                          <button title="Suspendre/Activer" onClick={() => toggleStatus(job.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-orange-500 hover:bg-orange-50 transition-colors"><Ban size={14} /></button>
                          <button title="Supprimer" onClick={() => deleteJob(job.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
