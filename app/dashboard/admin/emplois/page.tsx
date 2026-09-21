"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Search, PlusCircle, MoreHorizontal } from "lucide-react";
import Link from "next/link";

export default function AdminEmplois() {
  const [activeTab, setActiveTab] = useState("Toutes les offres");
  const [search, setSearch] = useState("");
  const [offres, setOffres] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/jobs')
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) {
          setOffres([]);
          setLoading(false);
          return;
        }
        const formatted = data.map((j: any) => ({
          id: j.id.substring(0, 8),
          rawId: j.id,
          titre: j.title,
          entreprise: j.recruiter?.companyName || "Entreprise Inconnue",
          date: new Date(j.createdAt).toLocaleDateString("fr-FR"),
          contrat: j.contractType || "Non spécifié",
          localisation: j.location || "Non spécifié",
          candidatures: 0,
          status: j.status === "PUBLISHED" ? "Actif" : (j.status === "CLOSED" ? "Suspendu" : "En attente"),
          isAdminCreated: false,
          candidats: 0
        }));
        setOffres(formatted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredToutesOffres = offres.filter(o => 
    o.titre.toLowerCase().includes(search.toLowerCase()) || 
    o.entreprise.toLowerCase().includes(search.toLowerCase())
  );

  const mockMesOffres = offres.filter(o => o.isAdminCreated);

  const stats = {
    total: offres.length,
    actifs: offres.filter(o => o.status === "Actif").length,
    attente: offres.filter(o => o.status === "En attente").length,
    suspendus: offres.filter(o => o.status === "Suspendu").length,
    supprimes: 0
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      
      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button 
          onClick={() => setActiveTab("Toutes les offres")}
          className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${activeTab === "Toutes les offres" ? "border-[#32A8D7] text-[#32A8D7]" : "border-transparent text-slate-500 hover:text-slate-700"}`}
        >
          Toutes les offres
        </button>
        <button 
          onClick={() => setActiveTab("Mes offres")}
          className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${activeTab === "Mes offres" ? "border-[#32A8D7] text-[#32A8D7]" : "border-transparent text-slate-500 hover:text-slate-700"}`}
        >
          Mes offres
        </button>
      </div>

      {activeTab === "Toutes les offres" && (
        <div className="space-y-6">
          {/* Header and Stats row */}
          <div className="flex flex-col xl:flex-row xl:items-center gap-6 justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold">
              <span className="text-[#232323]">Liste des</span> <span className="text-[#32A8D7]">offres</span>
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
                  {stats.total} offres au total
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
            {loading ? (
              <div className="p-8 text-center text-slate-500">Chargement des offres...</div>
            ) : filteredToutesOffres.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-[#f4f9fd] border-b border-slate-100">
                    <tr>
                      <th className="px-5 py-4 font-semibold text-[#1e4869]">ID</th>
                      <th className="px-5 py-4 font-semibold text-[#1e4869]">Titre du poste</th>
                      <th className="px-5 py-4 font-semibold text-[#1e4869]">Entreprise</th>
                      <th className="px-5 py-4 font-semibold text-[#1e4869]">Date de publication</th>
                      <th className="px-5 py-4 font-semibold text-[#1e4869]">Type de contrat</th>
                      <th className="px-5 py-4 font-semibold text-[#1e4869]">Localisation</th>
                      <th className="px-5 py-4 font-semibold text-[#1e4869]">Candidatures reçues</th>
                      <th className="px-5 py-4 font-semibold text-[#1e4869]">Statut</th>
                      <th className="px-5 py-4 font-semibold text-[#1e4869]">Action admin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredToutesOffres.map(o => (
                      <tr key={o.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 py-4 text-[#1e4869] font-medium">{o.id}</td>
                        <td className="px-5 py-4 text-[#1e4869] font-medium">{o.titre}</td>
                        <td className="px-5 py-4 text-[#1e4869]">{o.entreprise}</td>
                        <td className="px-5 py-4 text-[#1e4869] whitespace-nowrap">{o.date}</td>
                        <td className="px-5 py-4 text-[#1e4869]">{o.contrat}</td>
                        <td className="px-5 py-4 text-[#1e4869]">{o.localisation}</td>
                        <td className="px-5 py-4">
                          <span className="text-[#1e4869] font-medium">{o.candidatures}</span>
                          <button className="ml-2 text-[#32A8D7] font-semibold hover:underline">Tout voir</button>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full w-max text-xs font-semibold" style={{
                            backgroundColor: o.status === 'Actif' ? '#f0fdf4' : o.status === 'En attente' ? '#fefce8' : '#fef2f2',
                            color: '#475569'
                          }}>
                            {o.status}
                            <span className={`w-1.5 h-1.5 rounded-full ${o.status === 'Actif' ? 'bg-green-500' : o.status === 'En attente' ? 'bg-yellow-400' : 'bg-red-500'}`}></span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex flex-col gap-1 text-xs font-semibold items-start">
                            <button className="text-[#32A8D7] hover:underline">Voir l'offre</button>
                            
                            {o.status === 'En attente' && (
                              <button className="text-green-500 hover:underline">Approuver</button>
                            )}
                            {o.status === 'Suspendu' && (
                              <button className="text-green-500 hover:underline">Réactiver</button>
                            )}
                            
                            {/* L'admin ne modifie pas les offres externes, sauf s'il les a créées */}
                            {o.isAdminCreated && (
                              <button className="text-[#32A8D7] hover:underline">Modifier</button>
                            )}
                            
                            {o.status !== 'Suspendu' && (
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
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
                <p className="text-lg font-medium text-slate-500 mb-1">Aucune offre trouvée</p>
                <p className="text-sm">Il n'y a pas d'offres correspondant à vos critères.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "Mes offres" && (
        <div className="space-y-6">
          <div className="flex items-center text-sm text-slate-500">
            <Link href="/dashboard/admin" className="hover:text-slate-800">Accueil</Link>
            <span className="mx-2">›</span>
            <span>Offres créées par Check-CV</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-[#232323]">Emplois créés</h2>
            
            <div className="flex items-center gap-3">
              <span className="px-4 py-2 bg-[#eaf6fc] text-[#32A8D7] text-sm font-semibold rounded-lg">
                {mockMesOffres.length} emplois au total
              </span>
              <button className="px-4 py-2 bg-white border border-[#32A8D7] text-[#32A8D7] text-sm font-bold rounded-lg hover:bg-[#32A8D7] hover:text-white transition-colors">
                + Publier une offre
              </button>
            </div>
          </div>

          {mockMesOffres.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {mockMesOffres.map((o) => (
                  <div key={o.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 flex items-center justify-center bg-orange-50 rounded-lg">
                        {/* Placeholder for Check-CV logo in orange style */}
                        <div className="w-6 h-6 border-2 border-orange-500 rotate-45 flex items-center justify-center relative">
                           <span className="-rotate-45 text-[10px] font-bold text-orange-500">G</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span>Publié le: {o.date}</span>
                      <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full ${o.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                        <span>{o.status}</span>
                        <span className={`w-1.5 h-1.5 rounded-full ${o.status === 'Active' ? 'bg-green-500' : 'bg-yellow-400'}`}></span>
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-slate-800 text-base mb-1">{o.titre}</h3>
                    <p className="text-sm text-slate-500 mb-1">Entreprise : <span className="font-semibold text-[#32A8D7]">{o.entreprise}</span></p>
                    <p className="text-sm text-slate-500 mb-4">{o.location}</p>
                    
                    <p className="text-xs text-slate-400 mb-4">{o.candidats} Candidats</p>
                    
                    <div className="flex items-center gap-2 mt-auto">
                      <button className="flex-1 py-2 border border-[#32A8D7] text-[#32A8D7] text-sm font-semibold rounded-lg hover:bg-blue-50 transition-colors">
                        Voir détail
                      </button>
                      <button className="p-2 border border-slate-200 text-slate-500 rounded-lg hover:bg-slate-50 transition-colors">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end mt-6">
                <button className="px-6 py-2 bg-slate-100 text-slate-600 font-semibold rounded-lg text-sm hover:bg-slate-200 transition-colors">
                  Voir plus
                </button>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm flex flex-col items-center justify-center py-20 text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-slate-300">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              <p className="text-lg font-medium text-slate-500 mb-1">Vous n'avez publié aucune offre</p>
              <p className="text-sm mb-4">Cliquez sur le bouton "Publier une offre" pour créer votre première annonce.</p>
              <button className="px-6 py-2 bg-[#32A8D7] text-white font-bold rounded-lg hover:bg-[#2b91bb] transition-colors">
                + Publier une offre
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
