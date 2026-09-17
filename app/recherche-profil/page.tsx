"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Menu, 
  Bell, 
  ChevronDown, 
  Search, 
  X,
  ArrowLeft,
  ArrowRight
} from "lucide-react";
import TalentCard from "../components/TalentCard";

// Mock Data
const MOCK_TALENTS = Array.from({ length: 16 }).map((_, i) => ({
  id: i,
  name: "Alicia PARKER",
  location: "Cotonou, Bénin",
  profession: "Designer web",
  imageUrl: "/assets/Avatar ByeWind.png", // Or maybe an actual image from assets if we have one, but I'll use a placeholder or simply let it fall back. Wait, let's use a nice colored background if image fails, but I will assume this image works.
  isVerified: true
}));

export default function RechercheProfil() {
  const [searchQuery, setSearchQuery] = useState("graphisme");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button className="p-2 -ml-2 text-[#32A8D7] hover:bg-blue-50 rounded-lg transition-colors">
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-medium text-slate-800">
            Recherche <span className="font-bold">profil</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 pr-2 rounded-full transition-colors border border-transparent hover:border-slate-200">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200">
              <Image
                src="/assets/Avatar ByeWind.png"
                alt="Profile"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 flex flex-col gap-6">
        
        {/* Search Bar */}
        <div className="flex w-full gap-2 bg-white rounded-lg p-2 border border-slate-200 shadow-sm">
          <div className="flex-1 flex items-center gap-2 px-2">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 outline-none text-slate-700 bg-transparent text-sm placeholder:text-slate-400"
              placeholder="Rechercher un profil..."
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="p-1 hover:bg-slate-100 rounded-md text-slate-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button className="px-6 py-2 bg-[#32A8D7] text-white rounded-md text-sm font-medium hover:bg-[#2a95c2] transition-colors">
            Rechercher
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {["License", "Genre", "Pays", "Ville"].map((filter) => (
            <div key={filter} className="relative flex-1 min-w-[120px]">
              <select className="w-full appearance-none bg-slate-100 border border-slate-200 rounded-md py-2.5 pl-4 pr-10 text-sm font-medium text-slate-600 outline-none hover:border-slate-300 focus:border-[#32A8D7] cursor-pointer">
                <option value="">{filter}</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Talent Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_TALENTS.map((talent) => (
            <TalentCard 
              key={talent.id}
              name={talent.name}
              location={talent.location}
              profession={talent.profession}
              imageUrl={talent.imageUrl}
              isVerified={talent.isVerified}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 mb-6 flex items-center justify-between border-t border-slate-200 pt-6">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Page précédente
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#32A8D7] text-white rounded-md text-sm font-medium hover:bg-[#2a95c2] transition-colors">
              Page suivante
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="text-sm text-slate-500 font-medium">
            Page 1 de 26
          </div>
        </div>

      </main>
    </div>
  );
}
