import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Check CV – Plateforme intelligente de recrutement",
  description:
    "Check CV vous connecte aux meilleurs talents vérifiés par IA. Déposez votre CV, passez un test vidéo et boostez votre profil avec des étoiles.",
  keywords: ["recrutement", "CV", "talents", "Afrique", "emploi", "IA"],
  openGraph: {
    title: "Check CV",
    description: "Plateforme intelligente de mise en relation talents & recruteurs",
    siteName: "Check CV",
  },
};

import { AuthProvider } from "./context/AuthContext";
import { LangProvider } from "./context/LangContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LangProvider>
          <AuthProvider>{children}</AuthProvider>
        </LangProvider>
      </body>
    </html>
  );
}

