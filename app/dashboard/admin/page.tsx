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
import { LogoutModal } from "../recruteur/components/Modals";



// ── Data ───────────────────────────────────────────────────────────────────

const globalStats = [
  { label: "Talents inscrits", value: "0", icon: Users, color: "text-blue-600", bg: "bg-blue-50/50 hover:bg-blue-50", border: "border-blue-100", href: "/dashboard/admin/talents" },
  { label: "Recruteurs inscrits", value: "0", icon: Briefcase, color: "text-emerald-600", bg: "bg-emerald-50/50 hover:bg-emerald-50", border: "border-emerald-100", href: "/dashboard/admin/recruteurs" },
  { label: "Offres publiées", value: "0", icon: CheckCircle, color: "text-pink-600", bg: "bg-pink-50/50 hover:bg-pink-50", border: "border-pink-100", href: "/dashboard/admin/emplois" },
  { label: "Vidéos soumises", value: "0", icon: Eye, color: "text-amber-600", bg: "bg-amber-50/50 hover:bg-amber-50", border: "border-amber-100", href: "/dashboard/admin/talents" },
  { label: "Candidatures", value: "0", icon: TrendingUp, color: "text-indigo-600", bg: "bg-indigo-50/50 hover:bg-indigo-50", border: "border-indigo-100", href: "/dashboard/admin/emplois" },
];

const jobsData: any[] = [];
const lineData: any[] = [];
const pieData: any[] = [];
const barData: any[] = [];
const popularOffers: any[] = [];

export default function AdminDashboard() {
  const [jobs, setJobs] = useState(jobsData);

  const toggleStatus = (i: number) => {
    setJobs(prev => prev.map((j, idx) => idx === i ? { ...j, status: j.status === "Actif" ? "Inactif" : "Actif" } : j));
  };
  const deleteJob = (i: number) => {
    setJobs(prev => prev.filter((_, idx) => idx !== i));
  };

  return (
    <div className="space-y-5 animate-fade-in-up">

          {/* Global stats */}
          <div className="card p-5">
            <h2 className="font-bold text-slate-800 text-base mb-4">Statistiques globales</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {globalStats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <Link href={stat.href} key={i} className={`rounded-2xl border ${stat.border} ${stat.bg} p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 rounded-xl bg-white shadow-sm ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={22} strokeWidth={2.5} />
                      </div>
                    </div>
                    <div>
                      <p className="text-3xl font-black text-slate-800 mb-1">{stat.value}</p>
                      <p className={`text-[13px] font-bold ${stat.color} opacity-90 leading-tight`}>{stat.label}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Jobs table */}
          <div className="card p-5 overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-800">Offres d'emploi récentes</h2>
              <Link href="/dashboard/admin/emplois" className="btn-primary text-sm px-4 py-2" id="btn-tout-voir-emplois">Tout voir</Link>
            </div>
            {jobs.length > 0 ? (
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
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                <Briefcase size={48} className="mb-3 text-slate-300" />
                <p>Aucune offre publiée pour le moment.</p>
              </div>
            )}
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
              {lineData.length > 0 ? (
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
              ) : (
                <div className="flex items-center justify-center h-[200px] text-sm text-slate-400 border-2 border-dashed border-slate-100 rounded-xl">
                  Pas de données d'inscription
                </div>
              )}
            </div>

            {/* Pie chart */}
            <div className="card p-5">
              <h3 className="font-bold text-slate-800 mb-4">Répartition des contrats</h3>
              {pieData.length > 0 ? (
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
              ) : (
                <div className="flex items-center justify-center h-[200px] text-sm text-slate-400 border-2 border-dashed border-slate-100 rounded-xl mt-2">
                  Aucun contrat répertorié
                </div>
              )}
            </div>
          </div>

          {/* Charts row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Bar chart */}
            <div className="card p-5">
              <h3 className="font-bold text-slate-800 mb-4">Taux d'activité mensuelle</h3>
              {barData.length > 0 ? (
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#bfdbfe" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-[180px] text-sm text-slate-400 border-2 border-dashed border-slate-100 rounded-xl">
                  Pas de données d'activité
                </div>
              )}
            </div>

            {/* Popular offers */}
            <div className="card p-5">
              <h3 className="font-bold text-slate-800 mb-4">Offres populaires</h3>
              {popularOffers.length > 0 ? (
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
              ) : (
                <div className="flex items-center justify-center h-[180px] text-sm text-slate-400 border-2 border-dashed border-slate-100 rounded-xl">
                  Pas d'offres populaires
                </div>
              )}
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
    </div>
  );
}
