"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, XCircle } from "lucide-react";

export default function RecruteursPage() {
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
            Recrutez les meilleurs talents<br className="hidden md:block" />
            en toute simplicité
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto">
            Accédez à une base de profils qualifiés, certifiés et prêts à rejoindre votre équipe.
          </p>
        </div>

        {/* Hero Image */}
        <div className="max-w-4xl mx-auto flex justify-center mb-20 relative">
          <Image
            src="/assets/Frame 1000004830.png"
            alt="Recruteurs"
            width={800}
            height={500}
            className="w-full max-w-3xl h-auto object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/assets/Group 3.png";
            }}
          />
        </div>

        {/* 6 Features Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {[
            {
              title: "Accès à des talents qualifiés",
              desc: "Des profils vérifiés, notés et évalués par notre intelligence artificielle.",
            },
            {
              title: "Recherche intelligente",
              desc: "Trouvez rapidement les profils qui correspondent à vos critères de sélection.",
            },
            {
              title: "Profils certifiés",
              desc: "Vidéos, notes de l'IA et historique de validation pour recruter en toute confiance.",
            },
            {
              title: "Commencez gratuitement",
              desc: "Créez un compte recruteur et accédez aux premiers profils sans frais.",
            },
            {
              title: "Gagnez un temps fou",
              desc: "Réduire de 50 % le temps consacré au tri des candidatures et aux entretiens.",
            },
            {
              title: "Automatisation de processus",
              desc: "Automatisez le recrutement et réduisez de 40 % le temps dédié aux tâches manuelles.",
            },
          ].map((feat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-start gap-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-800 mb-2">{feat.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-black text-center text-slate-800 mb-10">
            Devenez Recruteur Premium sur Check-CV
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
                    "Accès à 3 CV vérifiés et qualifiés par mois",
                    "Support email",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                  {[
                    "Publier des offres d'emploi illimitées et mises en avant",
                    "Accès illimité aux talents de la plateforme",
                    "Gestion simplifiée des candidatures (suivi, messages, etc.)",
                    "Support prioritaire (email, chat en direct, et WhatsApp)",
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                Plan mensuel
              </div>
              <div className="p-8 text-center border-b border-slate-100">
                <div className="text-4xl font-black text-blue-600 mb-1">
                  1 000 CFA<span className="text-base font-normal text-slate-500">/par mois</span>
                </div>
                <p className="text-sm text-slate-500">Pour accélérer votre recrutement</p>
              </div>
              <div className="bg-blue-400 text-white text-center py-3 font-semibold text-sm">
                Version premium
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {[
                    "Toutes les fonctionnalités du plan gratuit, plus",
                    "Publier des offres d'emploi illimitées et mises en avant",
                    "Accès illimité aux talents de la plateforme",
                    "Gestion simplifiée des candidatures (suivi, messages, etc.)",
                    "Support prioritaire (email, chat en direct, et WhatsApp)",
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
            href="/inscription?type=recruteur"
            className="px-8 py-3 rounded-full font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg"
          >
            Créer mon compte recruteur
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
