"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Cookie, Settings, BarChart3, ShieldCheck } from "lucide-react";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <div className="bg-blue-600 text-white py-16 px-6" style={{ background: "linear-gradient(135deg, #0076a8 0%, #005a82 100%)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <Cookie size={48} className="mx-auto mb-6 text-blue-200" />
          <h1 className="text-3xl md:text-5xl font-black mb-4">Politique des Cookies</h1>
          <p className="text-blue-100 text-lg">Gérez vos préférences et comprenez comment nous utilisons les cookies.</p>
        </div>
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full py-16 px-6">
        
        <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Qu&apos;est-ce qu&apos;un cookie ?</h2>
          <p className="text-slate-600 leading-relaxed">
            Un cookie est un petit fichier texte déposé sur votre terminal lors de la visite de notre plateforme pour garantir le bon fonctionnement du site et améliorer votre expérience.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">2. Catégories de cookies utilisés sur Netacuv :</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-4">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Cookies Stricts (Obligatoires)</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Nécessaires pour maintenir votre session active, sécuriser votre compte et traiter les paiements.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Settings size={24} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Cookies Fonctionnels</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Sauvegardent vos préférences (ex: volume du lecteur vidéo, langue).
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-4">
                <BarChart3 size={24} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Cookies Analytiques</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Nous permettent de mesurer anonymement la fréquentation du site pour optimiser les performances.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 p-8 rounded-3xl shadow-sm border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">3. Gestion de vos choix</h2>
            <p className="text-slate-600">
              Vous pouvez modifier vos préférences en matière de cookies à tout moment via notre bandeau de consentement ou dans les paramètres de votre navigateur.
            </p>
          </div>
          <button className="px-6 py-3 bg-white text-blue-600 font-bold rounded-full shadow-sm hover:shadow-md border border-blue-200 transition-all flex-shrink-0">
            Modifier mes préférences
          </button>
        </section>

      </main>

      <Footer />
    </div>
  );
}
