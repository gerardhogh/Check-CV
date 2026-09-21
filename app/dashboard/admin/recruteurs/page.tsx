"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { RecruteurDetails } from "../components/RecruteurDetails";

const mockRecruteurs: any[] = [];

export default function AdminRecruteurs() {
  const [search, setSearch] = useState("");
  const [selectedRecruteur, setSelectedRecruteur] = useState<any>(null);

  const filtered = mockRecruteurs.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.email.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: mockRecruteurs.length,
    actifs: mockRecruteurs.filter(r => r.status === "Actif").length,
    attente: mockRecruteurs.filter(r => r.status === "En attente").length,
    suspendus: mockRecruteurs.filter(r => r.status === "Suspendu").length,
    supprimes: 0 // removed mock value
  };

  if (selectedRecruteur) {
    return <RecruteurDetails recruteur={selectedRecruteur} onBack={() => setSelectedRecruteur(null)} />;
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header and Stats row */}
      <div className="flex flex-col xl:flex-row xl:items-center gap-6 justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold">
          <span className="text-[#232323]">Liste des</span> <span className="text-[#32A8D7]">recruteurs</span>
        </h2>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#32A8D7] w-48 sm:w-64"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 bg-[#eaf6fc] border border-[#d6effa] text-[#32A8D7] text-sm font-semibold rounded-full">
              {stats.total} recruteurs au total
            </span>
            <span className="px-3 py-1.5 bg-green-50 border border-green-100 text-green-700 text-sm font-semibold rounded-full">
              {stats.actifs} actifs
            </span>
            <span className="px-3 py-1.5 bg-yellow-50 border border-yellow-100 text-yellow-700 text-sm font-semibold rounded-full">
              {stats.attente} en attente
            </span>
            <span className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 text-sm font-semibold rounded-full">
              {stats.suspendus} suspendus
            </span>
            <span className="px-3 py-1.5 bg-red-50 border border-red-100 text-red-600 text-sm font-semibold rounded-full">
              {stats.supprimes} supprimés
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        {filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#f4f9fd] border-b border-slate-100">
                <tr>
                  <th className="px-5 py-4 font-semibold text-[#1e4869]">No</th>
                  <th className="px-5 py-4 font-semibold text-[#1e4869]">Nom de recruteur</th>
                  <th className="px-5 py-4 font-semibold text-[#1e4869]">Offres publiées</th>
                  <th className="px-5 py-4 font-semibold text-[#1e4869]">Email professionnel</th>
                  <th className="px-5 py-4 font-semibold text-[#1e4869]">Contact principal</th>
                  <th className="px-5 py-4 font-semibold text-[#1e4869]">Offres publiées</th> {/* Deliberately matching Figma's duplicate column text */}
                  <th className="px-5 py-4 font-semibold text-[#1e4869]">Abonnement</th>
                  <th className="px-5 py-4 font-semibold text-[#1e4869]">Date d'inscription</th>
                  <th className="px-5 py-4 font-semibold text-[#1e4869]">Statut</th>
                  <th className="px-5 py-4 font-semibold text-[#1e4869]">Action admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-4 text-[#1e4869] font-medium">{r.no}</td>
                    <td className="px-5 py-4 text-[#1e4869] font-medium">{r.name}</td>
                    <td className="px-5 py-4 text-[#1e4869]">{r.offresPubliees}</td>
                    <td className="px-5 py-4 text-[#1e4869]">{r.email}</td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="font-bold text-[#1e4869]">{r.contact.substring(0, 4)}</span>
                      <span className="text-[#1e4869]">{r.contact.substring(4)}</span>
                    </td>
                    <td className="px-5 py-4 text-[#1e4869]">{r.candidats}</td>
                    <td className="px-5 py-4 text-[#1e4869]">{r.abonnement}</td>
                    <td className="px-5 py-4 text-[#1e4869] whitespace-pre-line leading-relaxed">{r.date}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full w-max text-xs font-semibold" style={{
                        backgroundColor: r.status === 'Actif' ? '#f0fdf4' : r.status === 'En attente' ? '#fefce8' : '#fef2f2',
                        color: '#475569'
                      }}>
                        {r.status}
                        <span className={`w-1.5 h-1.5 rounded-full ${r.status === 'Actif' ? 'bg-green-500' : r.status === 'En attente' ? 'bg-yellow-400' : 'bg-red-500'}`}></span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-1 text-xs font-semibold items-start">
                        <button onClick={() => setSelectedRecruteur(r)} className="text-[#32A8D7] hover:underline">Voir profil</button>
                        
                        {r.status === 'En attente' && (
                          <button className="text-green-500 hover:underline">Approuver</button>
                        )}
                        {r.status === 'Suspendu' && (
                          <button className="text-green-500 hover:underline">Réactiver</button>
                        )}
                        
                        <button className="text-[#32A8D7] hover:underline">Modifier</button>
                        
                        {r.status !== 'Suspendu' && (
                          <button className="text-yellow-500 hover:underline">Suspendre</button>
                        )}
                        
                        <button className="text-red-500 hover:underline">Supprimer</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-slate-300">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <p className="text-lg font-medium text-slate-500 mb-1">Aucun recruteur trouvé</p>
            <p className="text-sm">Il n'y a pas de recruteurs correspondant à vos critères.</p>
          </div>
        )}
      </div>
    </div>
  );
}
