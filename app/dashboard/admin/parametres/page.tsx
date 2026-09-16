"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  Menu, Bell, ChevronDown, X, LogOut, Home, Users, Briefcase,
  Settings, History, Save, Eye, EyeOff
} from "lucide-react";

const sidebarItems = [
  { href: "/dashboard/admin", icon: Home, label: "Tableau de bord" },
  { href: "/dashboard/admin/talents", icon: Users, label: "Talents" },
  { href: "/dashboard/admin/recruteurs", icon: Briefcase, label: "Recruteurs" },
  { href: "/dashboard/admin/emplois", icon: Briefcase, label: "Offres d'emploi" },
  { href: "/dashboard/admin/transactions", icon: History, label: "Transactions" },
  { href: "/dashboard/admin/parametres", icon: Settings, label: "Paramètres", active: true },
];

export default function AdminParametres() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user, logout } = useAuth();

  const [form, setForm] = useState({
    siteName: "Check CV",
    email: "admin@check.cv",
    phone: "+229 01 23 45 67",
    talentPremiumPrice: "700",
    recruteurProPrice: "1000",
    affiliationBonus: "1500",
    password: "",
    confirmPassword: "",
    maintenanceMode: false,
    allowNewRegistrations: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
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
                    <p className="text-xs font-bold text-slate-800">{user?.name || "Admin"}</p>
                    <p className="text-[11px] text-slate-400">{user?.email || "admin@check.cv"}</p>
                  </div>
                  <button onClick={logout} className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 font-semibold border-t border-slate-100 mt-1">Déconnexion</button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-5 space-y-5 max-w-3xl">
          <div>
            <h2 className="text-xl font-black text-slate-900">Paramètres de la plateforme</h2>
            <p className="text-sm text-slate-500">Configurez les paramètres globaux de Check CV</p>
          </div>

          {saved && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm font-medium">
              ✓ Paramètres enregistrés avec succès
            </div>
          )}

          {/* General */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3">Informations générales</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Nom de la plateforme</label>
                <input type="text" value={form.siteName} onChange={e => setForm({...form, siteName: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#32A8D7]" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Email de contact</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#32A8D7]" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Téléphone</label>
                <input type="text" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#32A8D7]" />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3">Tarification</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Talent Premium (CFA/mois)</label>
                <input type="number" value={form.talentPremiumPrice} onChange={e => setForm({...form, talentPremiumPrice: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#32A8D7]" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Recruteur Pro (CFA/mois)</label>
                <input type="number" value={form.recruteurProPrice} onChange={e => setForm({...form, recruteurProPrice: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#32A8D7]" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Bonus affiliation (CFA)</label>
                <input type="number" value={form.affiliationBonus} onChange={e => setForm({...form, affiliationBonus: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#32A8D7]" />
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3">Sécurité du compte admin</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Nouveau mot de passe</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="••••••••" className="w-full px-4 py-2.5 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#32A8D7]" />
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Confirmer le mot de passe</label>
                <input type={showPassword ? "text" : "password"} value={form.confirmPassword} onChange={e => setForm({...form, confirmPassword: e.target.value})} placeholder="••••••••" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#32A8D7]" />
              </div>
            </div>
          </div>

          {/* Platform toggles */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3">Contrôle de la plateforme</h3>
            <div className="space-y-4">
              {[
                { key: "maintenanceMode", label: "Mode maintenance", desc: "Désactiver l'accès public à la plateforme" },
                { key: "allowNewRegistrations", label: "Autoriser les nouvelles inscriptions", desc: "Permettre aux nouveaux utilisateurs de s'inscrire" },
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{label}</p>
                    <p className="text-xs text-slate-400">{desc}</p>
                  </div>
                  <button
                    onClick={() => setForm(f => ({ ...f, [key]: !f[key as keyof typeof f] }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${(form as any)[key] ? "bg-[#32A8D7]" : "bg-slate-200"}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow ${(form as any)[key] ? "translate-x-6" : "translate-x-1"}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 bg-[#32A8D7] text-white font-bold rounded-xl hover:bg-[#288eb8] transition-colors shadow-lg shadow-blue-500/20"
            >
              <Save size={16} /> Enregistrer les paramètres
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
