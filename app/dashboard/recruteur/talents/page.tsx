"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, Menu, Bell, ChevronDown } from "lucide-react";
import TalentCard from "../../../components/TalentCard";

// Mock data for talents
const MOCK_TALENTS = Array.from({ length: 16 }).map((_, i) => ({
  id: `t${i + 1}`,
  name: "Alicia PARKER",
  location: "Cotonou, Bénin",
  profession: "Designer web",
  imageUrl: "/assets/profile-placeholder.png", // Will be replaced by actual image if available
  isVerified: true,
}));

export default function RechercheProfilPage() {
  const [searchQuery, setSearchQuery] = useState("graphisme");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans">
      {/* Topbar */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button className="text-[#32A8D7] p-1">
            <Menu className="w-8 h-8" />
          </button>
          <h1 className="text-xl md:text-2xl text-slate-700 dark:text-slate-100">
            Recherche <span className="font-bold">profil</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
            <Bell className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
              <Image
                src="/assets/default-avatar.png" // Placeholder
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
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow flex items-center bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#32A8D7] focus-within:border-transparent transition-all">
            <div className="pl-4 text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher..."
              className="w-full py-3 px-3 bg-transparent text-sm text-slate-700 dark:text-slate-200 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="pr-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <button className="bg-[#32A8D7] hover:bg-[#2a95c2] text-white px-8 py-3 rounded-lg font-semibold text-sm transition-colors whitespace-nowrap">
            Rechercher
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {["License", "Genre", "Pays", "Ville"].map((filter) => (
            <div key={filter} className="relative">
              <select className="w-full appearance-none bg-slate-100 dark:bg-slate-800 border border-transparent dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm py-2.5 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#32A8D7]">
                <option value="">{filter}</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {MOCK_TALENTS.map((talent) => (
            <TalentCard key={talent.id} {...talent} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
          <div className="flex gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-center">
              ← Page précédente
            </button>
            <button className="flex-1 md:flex-none bg-[#32A8D7] hover:bg-[#2a95c2] text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors text-center">
              Page suivante →
            </button>
          </div>
          <div className="text-slate-500 dark:text-slate-400 text-sm">
            Page 1 de 26
          </div>
        </div>
      </main>
    </div>
  );
}
