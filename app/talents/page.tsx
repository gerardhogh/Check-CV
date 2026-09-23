"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, XCircle } from "lucide-react";

export default function TalentsPage() {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-500 selection:text-white">
      <Navbar />

      <main
        className="pt-16 pb-24 px-6 relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(200,235,255,0.8) 0%, rgba(240,248,255,0.9) 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4 text-blue-600">
            Mets toutes les chances de ton<br className="hidden md:block" />
            côté pour décrocher un emploi
          </h1>
          <p className="text-slate-600 text-lg md:text-xl">
            Valorise ton profil, teste tes compétences et sois visible des meilleurs recruteurs.
          </p>
        </div>

        {/* Hero Image */}
        <div className="max-w-3xl mx-auto flex justify-center mb-16 relative">
          <Image
            src="/assets/Frame 10000048306.png"
            alt="Talents"
            width={700}
            height={500}
            className="w-full max-w-2xl h-auto object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/assets/Group 2611.png";
            }}
          />
        </div>

        {/* 4 Features Grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {[
            {
              title: "Visibilité accrue",
              desc: "Soyez vu par des recruteurs sérieux à la recherche de votre profil.",
            },
            {
              title: "Certifiez votre profil en vidéo",
              desc: "Répondez à des questions d'entretien en vidéo pour vous démarquer.",
            },
            {
              title: "Notation intelligente",
              desc: "Une IA analyse votre profil et attribue une note de confiance.",
            },
            {
              title: "Accès à 700 FCFA/mois",
              desc: "Un petit investissement pour une grande visibilité.",
            },
          ].map((feat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-800 mb-1">{feat.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-black text-center text-slate-800 mb-10">
            Devenez Talent Premium sur Netacuv
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-2 rounded-3xl shadow-xl shadow-slate-200/50">
            {/* Gratuit */}
            <div className="rounded-2xl overflow-hidden border border-slate-100 bg-white">
              <div className="bg-[#005a82] text-white text-center py-4 font-bold text-lg">
                Gratuit
              </div>
              <div className="p-8 text-center border-b border-slate-100">
                <div className="text-4xl font-black text-slate-800 mb-1">
                  0 CFA<span className="text-base font-normal text-slate-500">/gratuit</span>
                </div>
                <p className="text-sm text-slate-500">Pour commencer à parcourir les avantages</p>
              </div>
              <div className="bg-[#005a82] text-white text-center py-3 font-semibold text-sm">
                Version gratuite
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {[
                    "Possibilité de créer et compléter son profil",
                    "Consultation d'offres d'emploi publiques",
                    "Entretien vidéo auto-évalué",
                    "Accès à la communauté exclusive WhatsApp",
                    "Affiliation : Gagne de l'argent en parrainant",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                  {[
                    "Ajout de CV/Curriculum Vitae en format PDF",
                    "Entretien vidéo automatisé",
                    "Visibilité accrue sur des recruteurs sérieux à la recherche de votre profil",
                    "Support technique rapide et disponible à plein temps sur la plateforme",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                      <XCircle size={18} className="text-red-400 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Plan mensuel */}
            <div className="rounded-2xl overflow-hidden border border-slate-100 bg-white shadow-lg relative">
              <div className="bg-blue-400 text-white text-center py-4 font-bold text-lg flex items-center justify-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20"/><path d="M5 20V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/><path d="M9 16v4"/><path d="M15 16v4"/></svg>
                Plan mensuel
              </div>
              <div className="p-8 text-center border-b border-slate-100">
                <div className="text-4xl font-black text-blue-600 mb-1">
                  700 CFA<span className="text-base font-normal text-slate-500">/par mois</span>
                </div>
                <p className="text-sm text-slate-500">Pour commencer à vous démarquer</p>
              </div>
              <div className="bg-blue-400 text-white text-center py-3 font-semibold text-sm">
                Version premium
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {[
                    "Toutes les fonctionnalités du plan gratuit, plus",
                    "Accès illimité aux offres d'emploi premium",
                    "Visibilité accrue par des recruteurs sérieux à la recherche de votre profil",
                    "Ajout de CV/Curriculum Vitae en format PDF",
                    "Entretien vidéo automatisé",
                    "Support technique rapide et disponible à plein temps sur la plateforme",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <p className="text-center text-sm text-slate-500 mt-6">
            Paiement sécurisé via mobile money. Aucun engagement, résiliable à tout moment.
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/inscription?type=talent"
            className="px-8 py-3 rounded-full font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg"
          >
            Créer mon compte maintenant
          </Link>
          <Link
            href="/connexion"
            className="px-8 py-3 rounded-full font-bold text-sm text-blue-600 bg-white border border-blue-200 hover:bg-blue-50 transition-colors"
          >
            Se connecter
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
