"use client";
import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

const mockTransactions: any[] = [];

export default function AdminTransactions() {
  const [search, setSearch] = useState("");

  const filteredTx = mockTransactions.filter(t => 
    t.user.toLowerCase().includes(search.toLowerCase()) || 
    t.ref.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-40">
          <p className="text-[#1e4869] text-sm">Chiffre d'affaires</p>
          <p className="text-3xl font-bold text-[#0c2f4a]">0 CFA</p>
          <button className="w-full py-2 bg-[#51B7E6] text-white font-semibold rounded-lg text-sm hover:opacity-90 transition-opacity">
            Voir tout
          </button>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-40">
          <p className="text-[#1e4869] text-sm">Transactions</p>
          <p className="text-3xl font-bold text-[#0c2f4a]">0</p>
          <button className="w-full py-2 bg-[#62D852] text-white font-semibold rounded-lg text-sm hover:opacity-90 transition-opacity">
            Voir tout
          </button>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-40">
          <p className="text-[#1e4869] text-sm">Transactions réussies</p>
          <p className="text-3xl font-bold text-[#0c2f4a]">0</p>
          <button className="w-full py-2 bg-[#FE7BF4] text-white font-semibold rounded-lg text-sm hover:opacity-90 transition-opacity">
            Voir tout
          </button>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-40">
          <p className="text-[#1e4869] text-sm">En attente</p>
          <p className="text-3xl font-bold text-[#0c2f4a]">0</p>
          <button className="w-full py-2 bg-[#D0D71B] text-white font-semibold rounded-lg text-sm hover:opacity-90 transition-opacity">
            Voir tout
          </button>
        </div>

      </div>

      {/* Title & Search & Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-[#0c2f4a]">Historique des transactions</h2>
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#32A8D7] w-full md:w-64"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {[
            { label: "Profil" },
            { label: "Type de transaction" },
            { label: "Statut" },
            { label: "Méthode" },
            { label: "Période" }
          ].map(f => (
            <button key={f.label} className="flex items-center justify-between gap-2 px-4 py-2.5 bg-slate-100 text-[#1e4869] text-sm font-medium rounded-xl hover:bg-slate-200 transition-colors flex-1 min-w-[140px]">
              {f.label}
              <ChevronDown size={14} className="text-slate-500" />
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        {filteredTx.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#f4f9fd] border-b border-slate-100">
                <tr>
                  <th className="px-4 py-4 font-semibold text-[#1e4869]">No</th>
                  <th className="px-4 py-4 font-semibold text-[#1e4869]">Date</th>
                  <th className="px-4 py-4 font-semibold text-[#1e4869]">Référence</th>
                  <th className="px-4 py-4 font-semibold text-[#1e4869]">Utilisateurs</th>
                  <th className="px-4 py-4 font-semibold text-[#1e4869]">Profil</th>
                  <th className="px-4 py-4 font-semibold text-[#1e4869]">Moyen de paiement</th>
                  <th className="px-4 py-4 font-semibold text-[#1e4869]">Montant</th>
                  <th className="px-4 py-4 font-semibold text-[#1e4869]">Service</th>
                  <th className="px-4 py-4 font-semibold text-[#1e4869]">Statut</th>
                  <th className="px-4 py-4 font-semibold text-[#1e4869]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTx.map(t => (
                  <tr key={t.no} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3 text-[#1e4869]">{t.no}</td>
                    <td className="px-4 py-3 text-[#1e4869] whitespace-pre-line leading-relaxed">{t.date}</td>
                    <td className="px-4 py-3 text-[#1e4869]">{t.ref}</td>
                    <td className="px-4 py-3 text-[#1e4869]">{t.user}</td>
                    <td className="px-4 py-3 text-[#1e4869]">{t.profil}</td>
                    <td className="px-4 py-3 text-[#1e4869]">{t.moyen}</td>
                    <td className="px-4 py-3 font-bold text-[#1e4869]">{t.montant}</td>
                    <td className="px-4 py-3 text-[#1e4869] max-w-[150px]">{t.service}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full w-max text-[11px] font-semibold" style={{
                        backgroundColor: t.status === 'Réussie' ? '#f0fdf4' : '#fef2f2',
                        color: '#475569'
                      }}>
                        {t.status}
                        <span className={`w-1.5 h-1.5 rounded-full ${t.status === 'Réussie' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-[#32A8D7] font-semibold hover:underline">Voir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-slate-300">
              <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
              <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
              <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
            </svg>
            <p className="text-lg font-medium text-slate-500 mb-1">Aucune transaction trouvée</p>
            <p className="text-sm">Il n'y a pas de transactions correspondant à vos critères.</p>
          </div>
        )}
      </div>
      
    </div>
  );
}
