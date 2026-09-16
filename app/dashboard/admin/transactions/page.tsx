"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  Menu, Bell, ChevronDown, X, LogOut, Home, Users, Briefcase,
  Settings, History, Download, ArrowUpRight, ArrowDownLeft
} from "lucide-react";

const sidebarItems = [
  { href: "/dashboard/admin", icon: Home, label: "Tableau de bord" },
  { href: "/dashboard/admin/talents", icon: Users, label: "Talents" },
  { href: "/dashboard/admin/recruteurs", icon: Briefcase, label: "Recruteurs" },
  { href: "/dashboard/admin/emplois", icon: Briefcase, label: "Offres d'emploi" },
  { href: "/dashboard/admin/transactions", icon: History, label: "Transactions", active: true },
  { href: "/dashboard/admin/parametres", icon: Settings, label: "Paramètres" },
];

const transactions = [
  { id: "TXN-001", user: "Kofi Mensah", type: "Abonnement Premium", amount: 700, currency: "CFA", direction: "in", date: "14 Avr 2025 - 10h22", status: "Succès", method: "MTN Mobile Money" },
  { id: "TXN-002", user: "Samuel Kone", type: "Abonnement Premium", amount: 700, currency: "CFA", direction: "in", date: "12 Avr 2025 - 14h05", status: "Succès", method: "Orange Money" },
  { id: "TXN-003", user: "Grand-G Corp", type: "Pack Recruteur Pro", amount: 1000, currency: "CFA", direction: "in", date: "10 Avr 2025 - 09h18", status: "Succès", method: "Wave" },
  { id: "TXN-004", user: "Awa Diallo", type: "Retrait Affiliation", amount: 3000, currency: "CFA", direction: "out", date: "8 Avr 2025 - 16h40", status: "En attente", method: "Moov Money" },
  { id: "TXN-005", user: "Jean-Pierre N.", type: "Abonnement Premium", amount: 700, currency: "CFA", direction: "in", date: "5 Avr 2025 - 11h00", status: "Échoué", method: "MTN Mobile Money" },
  { id: "TXN-006", user: "TechSenegal SA", type: "Pack Recruteur Pro", amount: 1000, currency: "CFA", direction: "in", date: "2 Avr 2025 - 08h30", status: "Succès", method: "Orange Money" },
];

const statusColors: Record<string, string> = {
  "Succès": "bg-green-50 text-green-700",
  "En attente": "bg-yellow-50 text-yellow-700",
  "Échoué": "bg-red-50 text-red-700",
};

export default function AdminTransactions() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const totalIn = transactions.filter(t => t.direction === "in" && t.status === "Succès").reduce((a, t) => a + t.amount, 0);
  const totalOut = transactions.filter(t => t.direction === "out").reduce((a, t) => a + t.amount, 0);

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
              <h2 className="text-xl font-black text-slate-900">Transactions</h2>
              <p className="text-sm text-slate-500">{transactions.length} transactions récentes</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
              <Download size={16} /> Exporter CSV
            </button>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                <ArrowDownLeft size={22} className="text-green-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Total encaissé (ce mois)</p>
                <p className="text-2xl font-black text-green-600">{totalIn.toLocaleString()} CFA</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                <ArrowUpRight size={22} className="text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Total décaissé (retraits)</p>
                <p className="text-2xl font-black text-orange-600">{totalOut.toLocaleString()} CFA</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    {["Réf.", "Utilisateur", "Type", "Montant", "Méthode", "Date", "Statut"].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {transactions.map(t => (
                    <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-slate-500">{t.id}</td>
                      <td className="px-4 py-3 font-semibold text-slate-900 whitespace-nowrap">{t.user}</td>
                      <td className="px-4 py-3 text-slate-500">{t.type}</td>
                      <td className="px-4 py-3">
                        <span className={`font-bold ${t.direction === "in" ? "text-green-600" : "text-orange-600"}`}>
                          {t.direction === "in" ? "+" : "−"}{t.amount.toLocaleString()} {t.currency}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-500 text-xs">{t.method}</td>
                      <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">{t.date}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusColors[t.status] || "bg-slate-100 text-slate-600"}`}>{t.status}</span>
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
