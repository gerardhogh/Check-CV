"use client";

import { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function PremiumBanner() {
  const { data: session } = useSession();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Ne pas afficher si l'utilisateur est Premium
    if (session?.user?.isPremium) return;
    
    // Vérifier si la bannière a été fermée
    const bannerClosed = localStorage.getItem("premiumBannerClosed");
    
    // Si pas fermée ou expirée (on peut mettre une expiration si on veut)
    if (bannerClosed !== "true") {
      setIsVisible(true);
    }
  }, [session]);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("premiumBannerClosed", "true");
  };

  const isTalent = session?.user?.role === "TALENT";

  return (
    <div className="bg-gradient-to-r from-[#32A8D7] to-[#0071a2] text-white p-4 relative overflow-hidden shadow-lg border-b border-[#0071a2]/50">
      {/* Element décoratif or */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl -mr-10 -mt-10" />
      
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-yellow-500/20 rounded-lg shrink-0">
            <Sparkles className="text-yellow-400 w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-yellow-50">
              Passez à la vitesse supérieure avec le Premium
            </h3>
            <p className="text-blue-100 text-sm mt-0.5">
              {isTalent 
                ? "Postulez en illimité et boostez votre visibilité auprès des meilleurs recruteurs." 
                : "Accédez sans limite aux coordonnées et téléchargez les CV de tous les talents."}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 shrink-0">
          <Link 
            href={isTalent ? "/dashboard/talent/premium" : "/dashboard/recruteur/premium"} 
            className="whitespace-nowrap px-5 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-slate-900 font-semibold rounded-lg shadow-md transition-all active:scale-95"
          >
            Découvrir le Premium
          </Link>
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-blue-200 hover:text-white"
            aria-label="Fermer la bannière"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
