"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #0076a8 0%, #005a82 100%)",
        color: "white",
      }}
      className="pt-16 pb-8"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/15">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <div className="relative h-10 w-44">
                <Image
                  src="/assets/CC white png horiz.png"
                  alt="Netacuv Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-blue-100/80 text-sm leading-relaxed mb-6">
              Aider les chercheurs d'emploi à se démarquer et les recruteurs à
              trouver le talent parfait.
            </p>
            <div className="flex gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:opacity-90 relative overflow-hidden bg-white/10"
              >
                <Image
                  src="/assets/Linkedin.png"
                  alt="LinkedIn"
                  width={22}
                  height={22}
                  className="object-contain"
                />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:opacity-90 relative overflow-hidden bg-white/10"
              >
                <Image
                  src="/assets/Facebook.png"
                  alt="Facebook"
                  width={22}
                  height={22}
                  className="object-contain"
                />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:opacity-90 relative overflow-hidden bg-white/10"
              >
                <Image
                  src="/assets/Twitter.png"
                  alt="Twitter"
                  width={22}
                  height={22}
                  className="object-contain"
                />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Accueil" },
                { href: "/#pourquoi", label: "Pourquoi Netacuv ?" },
                { href: "/#comment", label: "Comment ça marche ?" },
                { href: "/talents", label: "Pour les Talents" },
                { href: "/recruteurs", label: "Pour les Recruteurs" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-blue-100/70 hover:text-white text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm tracking-wide">
              Support & Assistance
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/a-propos", label: "À Propos de Netacuv" },
                { href: "/faq", label: "FAQ" },
                { href: "/support", label: "Support" },
                { href: "/contact", label: "Contacts" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-blue-100/70 hover:text-white text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / S'abonner */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm tracking-wide">
              S'abonner
            </h4>
            <p className="text-blue-100/70 text-sm mb-4">
              Restez informé des meilleures opportunités et actualités.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="Adresse e-mail"
                className="flex-1 px-4 py-2.5 rounded-xl text-sm bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                type="submit"
                className="w-11 h-11 rounded-xl flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md flex-shrink-0"
                aria-label="S'abonner"
              >
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-xs text-blue-100/70">
          <div className="flex items-center gap-3">
            <Link href="/terms" className="hover:text-white transition-colors">
              Conditions d'utilisation
            </Link>
            <span>-</span>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Politique de Confidentialité
            </Link>
            <span>-</span>
            <Link href="/cookies" className="hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
          <p>
            • © 2025 <span className="text-white font-semibold">Netacuv</span>. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
