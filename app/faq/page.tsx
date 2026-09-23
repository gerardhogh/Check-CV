"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";

export default function FAQPage() {
  const [activeFaqTab, setActiveFaqTab] = useState<"talents" | "recruteurs">("talents");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const talentFaqs = [
    {
      q: "1. Est-ce que la plateforme est gratuite ?",
      a: "L'accès aux fonctionnalités clés nécessite un petit abonnement de 700 FCFA/mois pour les talents afin de garantir la qualité des profils certifiés.",
    },
    {
      q: "2. Comment mon CV est-il évalué ?",
      a: "Notre IA analyse votre CV selon plusieurs critères précis : structure, compétences clés, pertinence des expériences et clarté.",
    },
    {
      q: "3. Que sont les étoiles et badges ?",
      a: "Les étoiles valorisent votre profil auprès des entreprises : score IA du CV, entretien vidéo réussi et complétion totale.",
    },
    {
      q: "4. Le test vidéo est-il obligatoire ?",
      a: "Il n'est pas obligatoire mais vivement recommandé car les profils avec vidéo certifiée sont 3 fois plus consultés par les recruteurs.",
    },
    {
      q: "5. Puis-je refaire le test vidéo ?",
      a: "Oui, vous disposez de 3 essais pour enregistrer et valider votre meilleure prestation.",
    },
    {
      q: "6. Est-ce que mes informations sont visibles publiquement ?",
      a: "Non, seules les entreprises et recruteurs vérifiés ont accès à vos informations selon vos paramètres de confidentialité.",
    },
  ];

  const recruteurFaqs = [
    {
      q: "7. Comment accéder aux profils des talents ?",
      a: "Après création de votre compte recruteur, accédez instantanément à notre vivier de talents avec filtres multicritères.",
    },
    {
      q: "8. Puis-je poster des offres d'emploi ?",
      a: "Oui, vous pouvez publier vos offres d'emploi gratuitement et recevoir des candidatures qualifiées directement sur votre tableau de bord.",
    },
    {
      q: "9. Comment est vérifiée la qualité des profils ?",
      a: "Chaque talent passe une vérification automatisée de CV et un entretien vidéo avec scoring IA transparent.",
    },
    {
      q: "10. Est-ce qu'il y a un coût pour les recruteurs ?",
      a: "Netacuv propose une version gratuite pour démarrer, et un plan mensuel à 1 000 FCFA/mois pour des recherches et téléchargements illimités.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-500 selection:text-white flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* ── FAQ (ACCORDION FULL WIDTH DEEP BLUE MATCHING FIGMA) ── */}
        <section
          id="faq"
          className="py-24 px-6 text-white min-h-[calc(100vh-140px)]"
          style={{
            background: "linear-gradient(180deg, #0076a8 0%, #005a82 100%)",
          }}
        >
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-5xl font-black text-center mb-12 text-white">
              Questions fréquentes
            </h2>

            {/* FAQ Tabs */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex p-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                <button
                  onClick={() => setActiveFaqTab("talents")}
                  className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all ${
                    activeFaqTab === "talents"
                      ? "bg-white text-blue-700 shadow-lg"
                      : "text-blue-100 hover:text-white"
                  }`}
                >
                  Pour les Talents
                </button>
                <button
                  onClick={() => setActiveFaqTab("recruteurs")}
                  className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all ${
                    activeFaqTab === "recruteurs"
                      ? "bg-white text-blue-700 shadow-lg"
                      : "text-blue-100 hover:text-white"
                  }`}
                >
                  Pour les Recruteurs
                </button>
              </div>
            </div>

            {/* Accordion Questions */}
            <div className="space-y-4">
              {(activeFaqTab === "talents" ? talentFaqs : recruteurFaqs).map(
                (faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base hover:bg-white/5 transition-colors"
                      >
                        <span>{faq.q}</span>
                        <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-blue-100 leading-relaxed border-t border-white/10">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
