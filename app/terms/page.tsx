"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsPage() {
  const sections = [
    { id: "mentions-legales", title: "1. Mentions Légales" },
    { id: "description-service", title: "2. Description du Service" },
    { id: "inscription-abonnements", title: "3. Inscription et Abonnements" },
    { id: "utilisation-regles", title: "4. Utilisation du Service et Règles de Conduite" },
    { id: "propriete-intellectuelle", title: "5. Propriété Intellectuelle" },
    { id: "limitation-responsabilite", title: "6. Limitation de Responsabilité" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <div className="bg-blue-600 text-white py-16 px-6" style={{ background: "linear-gradient(135deg, #0076a8 0%, #005a82 100%)" }}>
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-black mb-4">Conditions Générales d'Utilisation (CGU)</h1>
          <p className="text-blue-100 text-lg">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
        </div>
      </div>

      <main className="flex-1 max-w-5xl mx-auto w-full py-12 px-6 flex flex-col md:flex-row gap-12">
        {/* Sticky Sidebar */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4 uppercase text-sm tracking-wider">Sommaire</h3>
            <nav className="space-y-3">
              {sections.map((section) => (
                <a key={section.id} href={`#${section.id}`} className="block text-sm text-slate-600 hover:text-blue-600 transition-colors leading-relaxed font-medium">
                  {section.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 prose prose-slate max-w-none prose-headings:text-blue-900 prose-a:text-blue-600">
          
          <section id="mentions-legales" className="mb-10 scroll-mt-24">
            <h2 className="text-2xl font-bold border-b border-slate-100 pb-3 mb-4">Article 1 : Mentions Légales</h2>
            <p className="text-slate-600 leading-relaxed">
              La plateforme Check CV est éditée et exploitée par la société <strong>Check CV SAS</strong>. Hébergement assuré par Vercel Inc. et infrastructures de données sécurisées.
            </p>
          </section>

          <section id="description-service" className="mb-10 scroll-mt-24">
            <h2 className="text-2xl font-bold border-b border-slate-100 pb-3 mb-4">Article 2 : Description du Service</h2>
            <p className="text-slate-600 leading-relaxed">
              Check CV est une plateforme numérique d'évaluation, de valorisation et de mise en relation professionnelle. Elle permet aux chercheurs d'emploi ("Talents") de structurer leur profil, de téléverser un CV et d'effectuer des tests vidéo analysés par Intelligence Artificielle. Elle permet aux "Recruteurs" d'accéder à une CVthèque qualifiée.
            </p>
          </section>

          <section id="inscription-abonnements" className="mb-10 scroll-mt-24">
            <h2 className="text-2xl font-bold border-b border-slate-100 pb-3 mb-4">Article 3 : Inscription et Abonnements</h2>
            <ul className="list-disc pl-5 space-y-3 text-slate-600 leading-relaxed">
              <li><strong>Côté Talents :</strong> L'accès aux fonctionnalités avancées (certification, test vidéo IA, visibilité prioritaire) est soumis à un abonnement de 700 FCFA/mois. L'abonnement est sans engagement et résiliable à tout moment depuis le tableau de bord.</li>
              <li><strong>Modalités de paiement :</strong> Les transactions sont effectuées via nos partenaires de paiement sécurisés (Mobile Money et Carte bancaire). Aucun remboursement n'est effectué pour un mois entamé.</li>
            </ul>
          </section>

          <section id="utilisation-regles" className="mb-10 scroll-mt-24">
            <h2 className="text-2xl font-bold border-b border-slate-100 pb-3 mb-4">Article 4 : Utilisation du Service et Règles de Conduite</h2>
            <p className="text-slate-600 leading-relaxed mb-3">L'utilisateur s'engage à fournir des informations exactes et sincères dans son CV. Lors de l'enregistrement du test vidéo IA, l'utilisateur s'interdit de :</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600 leading-relaxed mb-3">
              <li>Proférer des propos injurieux, diffamatoires, racistes ou haineux.</li>
              <li>Recourir à une usurpation d'identité ou tenter de fausser l'analyse de l'IA par des moyens artificiels.</li>
            </ul>
            <p className="text-slate-600 leading-relaxed font-medium text-red-600">Tout manquement entraînera la suspension immédiate du compte sans remboursement.</p>
          </section>

          <section id="propriete-intellectuelle" className="mb-10 scroll-mt-24">
            <h2 className="text-2xl font-bold border-b border-slate-100 pb-3 mb-4">Article 5 : Propriété Intellectuelle</h2>
            <p className="text-slate-600 leading-relaxed">
              L'ensemble de la marque, du design, des algorithmes d'analyse IA, des textes et logos de Check CV sont la propriété exclusive de Check CV SAS. L'utilisateur conserve la propriété intellectuelle de son CV et de ses enregistrements vidéo, mais concède à Check CV une licence d'utilisation pour l'affichage auprès des recruteurs.
            </p>
          </section>

          <section id="limitation-responsabilite" className="mb-10 scroll-mt-24">
            <h2 className="text-2xl font-bold border-b border-slate-100 pb-3 mb-4">Article 6 : Limitation de Responsabilité</h2>
            <p className="text-slate-600 leading-relaxed">
              Check CV est une plateforme d'intermédiation et d'évaluation. Check CV ne garantit pas l'obtention d'un emploi pour les Talents, ni le recrutement effectif pour les Recruteurs.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
