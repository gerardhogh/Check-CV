"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { Plus, Minus, Search, ArrowRight } from "lucide-react";

import Link from "next/link";

export default function SupportPage() {
  const [activeFaqTab, setActiveFaqTab] = useState<"talents" | "recruteurs" | "technique">("talents");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const talentFaqs = [
    { q: "Comment fonctionne le test vidéo IA ?", a: "Une fois votre CV téléversé, vous pouvez passer une simulation d&apos;entretien de 3 questions générées par l&apos;IA en fonction de votre domaine. L&apos;IA évalue la clarté de votre communication et la structure de vos réponses pour vous attribuer un badge et des étoiles sur votre profil." },
    { q: "Pourquoi l&apos;abonnement est-il payant (700 FCFA/mois) ?", a: "Cet abonnement symbolique permet d&apos;assurer un niveau d&apos;engagement élevé de la part des candidats, d&apos;entretenir les serveurs d&apos;analyse IA et de garantir aux recruteurs un accès exclusif à une base de profils vérifiés et motivés." },
    { q: "Comment sont attribués les badges et les étoiles ?", a: "Les étoiles reflètent la complétude de votre profil et la qualité globale de vos réponses lors du test vidéo IA. Les badges certifient la véracité des informations de votre CV après modération." },
  ];

  const recruteurFaqs = [
    { q: "Comment sont vérifiés les profils des talents ?", a: "Chaque candidat passe par une double étape : une modération automatique pour vérifier la lisibilité du CV et une évaluation via le test vidéo IA. Les profils certifiés garantissent que les compétences orales et le parcours sont valides." },
    { q: "Puis-je visionner les prestations vidéo avant d&apos;échanger avec un candidat ?", a: "Oui, en tant que recruteur abonné, vous avez un accès illimité aux séquences vidéo des tests IA afin d&apos;évaluer le savoir-être et la communication orale de chaque candidat avant de planifier un entretien." },
  ];

  const techniqueFaqs = [
    { q: "Quels sont les modes de paiement acceptés ?", a: "Nous acceptons les paiements par Mobile Money (MTN MoMo, Moov Money, Wave, Orange Money selon le pays) et par carte bancaire (Visa, Mastercard)." },
    { q: "Que faire si mon navigateur ne détecte pas ma caméra pour le test vidéo ?", a: "Assurez-vous d&apos;avoir autorisé l&apos;accès à la caméra et au microphone dans les paramètres de votre navigateur (Chrome, Safari ou Edge). Si le problème persiste, videz le cache ou tentez l&apos;enregistrement depuis notre application mobile/navigateur smartphone." },
  ];

  const faqsToDisplay = activeFaqTab === "talents" ? talentFaqs : activeFaqTab === "recruteurs" ? recruteurFaqs : techniqueFaqs;
  const filteredFaqs = faqsToDisplay.filter(faq => faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || faq.a.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Header Section */}
        <section className="bg-blue-600 text-white py-20 px-6 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #0076a8 0%, #005a82 100%)" }}>
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-black mb-6">Comment pouvons-nous vous aider ?</h1>
            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="text-white" size={20} />
              </div>
              <input 
                type="text" 
                placeholder="Rechercher une question, un mot-clé..." 
                className="w-full pl-12 pr-4 py-4 rounded-full bg-transparent border border-white/60 text-white placeholder-white/70 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16 px-6 max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="flex justify-center mb-10 overflow-x-auto pb-4">
            <div className="inline-flex p-1.5 rounded-full bg-white shadow-sm border border-slate-200 min-w-max">
              {[
                { id: "talents", label: "Talents" },
                { id: "recruteurs", label: "Recruteurs" },
                { id: "technique", label: "Technique & Paiement" },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFaqTab(tab.id as "talents" | "recruteurs" | "technique")}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                    activeFaqTab === tab.id
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion */}
          <div className="space-y-4 min-h-[300px]">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div key={index} className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden transition-all hover:shadow-md">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-800 hover:text-blue-600 transition-colors"
                    >
                      <span className="text-base sm:text-lg">{faq.q}</span>
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${isOpen ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 text-slate-500">
                Aucun résultat trouvé pour &quot;{searchQuery}&quot;.
              </div>
            )}
          </div>
        </section>

        {/* Image Banner */}
        <section className="px-6 mb-8">
          <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-xl relative h-64 md:h-80 border border-slate-100 group">
            <img 
              src="/Images/african-american-woman-experiencing-vr-simulation.jpg" 
              alt="Support et Assistance Netacuv"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
            />
          </div>
        </section>

        {/* CTA Contact */}
        <section className="py-12 px-6 mb-12">
          <div className="max-w-4xl mx-auto rounded-3xl p-10 md:p-14 text-center shadow-xl border border-blue-100 bg-white bg-gradient-to-br from-white to-blue-50/50">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">Vous n&apos;avez pas trouvé votre réponse ?</h2>
            <p className="text-slate-600 mb-8 max-w-lg mx-auto">
              Notre équipe d&apos;assistance est à votre disposition pour répondre à toutes vos questions complémentaires.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            >
              Contactez-nous <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
