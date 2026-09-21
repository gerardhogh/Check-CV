# Implémentation du Vivier de Talents (Recruteur)

Cette implémentation concerne la création de la page de recherche de talents pour les recruteurs avec le nouveau design fourni (Vivier de Talents Certifiés).

## User Review Required

> [!WARNING]
> **Refonte du Layout Recruteur**
> Pour respecter votre demande de placer la page sous `app/dashboard/recruteur/recherche-profil` et pour garantir que la barre latérale (Sidebar) reste visible, il est nécessaire de refactoriser le fichier `app/dashboard/recruteur/page.tsx`. Actuellement, le tableau de bord fonctionne sur une seule page avec un système d'onglets (state React).
>
> Je vais extraire la `Sidebar` et le `Header` dans un `app/dashboard/recruteur/layout.tsx` (comme cela a été fait pour l'interface Admin) afin que la navigation soit gérée par les vraies routes Next.js (`/dashboard/recruteur` et `/dashboard/recruteur/recherche-profil`).

## Open Questions

> [!IMPORTANT]
> **Données manquantes dans le schéma Prisma**
> Le nouveau design inclut une localisation (ex: "Cotonou, Bénin"), un titre de poste (ex: "Développeur Full-Stack") et une note (ex: ★ 5.0). Actuellement, le schéma Prisma `TalentProfile` ne contient ni de champ de localisation, ni de note IA explicite, et `skills` est un format JSON/texte.
> *Question* : Puis-je rajouter temporairement des champs optionnels comme `location`, `rating` et `title` au modèle `TalentProfile` dans `schema.prisma`, ou souhaitez-vous que je me base sur les champs existants (`bio` pour le titre, etc.) avec des valeurs par défaut pour la note et la localisation ?

## Proposed Changes

### Composants Dashboard
#### [MODIFY] [app/dashboard/recruteur/layout.tsx](file:///Users/Gerardho/Documents/GH/Works/PROJECT/Check%20CV/Check%20CV/app/dashboard/recruteur/layout.tsx)
- Création du layout partagé avec la `Sidebar` et le `Header`.
- Mise à jour de la navigation pour utiliser `next/link` avec surbrillance de la route active.

#### [MODIFY] [app/dashboard/recruteur/page.tsx](file:///Users/Gerardho/Documents/GH/Works/PROJECT/Check%20CV/Check%20CV/app/dashboard/recruteur/page.tsx)
- Allègement de la page : elle ne contiendra plus que le contenu de l'onglet `dashboard` (Tableau de bord).

### Page de Recherche
#### [NEW] [app/dashboard/recruteur/recherche-profil/page.tsx](file:///Users/Gerardho/Documents/GH/Works/PROJECT/Check%20CV/Check%20CV/app/dashboard/recruteur/recherche-profil/page.tsx)
- Création de la page en Server Component.
- Connexion directe à PostgreSQL via Prisma (`prisma.talentProfile.findMany()`).
- Implémentation du titre "Vivier de Talents Certifiés".
- Barre de recherche textuelle stylisée (background gris clair).
- Grille de cartes (2 colonnes) respectant strictement le design Figma.
- Gestion d'un état vide propre ("Aucun talent inscrit pour le moment").

### Carte Talent
#### [NEW] [app/components/TalentCardNew.tsx](file:///Users/Gerardho/Documents/GH/Works/PROJECT/Check%20CV/Check%20CV/app/components/TalentCardNew.tsx)
- Avatar rond à gauche, icône marque-page (jaune/gris) en haut à droite.
- Boutons "Voir le profil" (bleu) et "Contacter" (contour bleu).
- Badge "Vidéo IA validée".
- Affichage de la note (étoile + 5.0).

## Verification Plan

### Manual Verification
- Je vous demanderai de naviguer entre le "Tableau de bord" et la "Recherche talents" pour valider la fluidité du nouveau Layout.
- Vérification visuelle de la page "Recherche talents" pour s'assurer qu'elle correspond 100% au nouveau design Figma fourni (incluant les bordures, couleurs, boutons, et typographies).
- Si la base de données est vide, vérification de l'affichage de l'Empty State propre.
