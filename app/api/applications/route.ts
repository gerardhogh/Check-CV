import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET : Récupérer les candidatures selon le rôle de l'utilisateur
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Vous devez être connecté pour accéder aux candidatures." },
      { status: 401 }
    );
  }

  try {
    const role = session.user.role;

    // 1. TALENT : ne voit que ses propres candidatures
    if (role === "TALENT") {
      const talentProfile = await prisma.talentProfile.findFirst({
        where: { userId: session.user.id },
      });

      if (!talentProfile) {
        return NextResponse.json([]);
      }

      const applications = await prisma.application.findMany({
        where: { talentId: talentProfile.id },
        include: { jobOffer: true },
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json(applications);
    }

    // 2. RECRUITER : ne voit que les candidatures sur ses offres
    if (role === "RECRUITER") {
      const recruiterProfile = await prisma.recruiterProfile.findFirst({
        where: { userId: session.user.id },
      });

      if (!recruiterProfile) {
        return NextResponse.json([]);
      }

      const applications = await prisma.application.findMany({
        where: {
          jobOffer: {
            recruiterId: recruiterProfile.id,
          },
        },
        include: { talent: true, jobOffer: true },
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json(applications);
    }

    // 3. ADMIN : accès global
    if (role === "ADMIN") {
      const applications = await prisma.application.findMany({
        include: { talent: true, jobOffer: true },
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json(applications);
    }

    return NextResponse.json({ error: "Rôle non autorisé." }, { status: 403 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des candidatures." },
      { status: 500 }
    );
  }
}

// POST : Soumettre une candidature
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Vous devez être connecté pour postuler." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { jobOfferId } = body;

    if (!jobOfferId) {
      return NextResponse.json(
        { error: "L'identifiant de l'offre d'emploi est obligatoire." },
        { status: 400 }
      );
    }

    // Récupérer le profil Talent de l'utilisateur connecté
    const talentProfile = await prisma.talentProfile.findFirst({
      where: { userId: session.user.id },
    });

    if (!talentProfile) {
      return NextResponse.json(
        { error: "Profil talent introuvable. Veuillez compléter votre profil avant de postuler." },
        { status: 400 }
      );
    }

    // Vérifier l'existence de l'offre d'emploi
    const jobOffer = await prisma.jobOffer.findUnique({
      where: { id: jobOfferId },
    });

    if (!jobOffer) {
      return NextResponse.json(
        { error: "L'offre d'emploi n'existe pas." },
        { status: 404 }
      );
    }

    // Création de la candidature rattachée de façon sécurisée
    const newApplication = await prisma.application.create({
      data: {
        jobOfferId,
        talentId: talentProfile.id,
      },
    });

    return NextResponse.json(newApplication, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la soumission de la candidature." },
      { status: 500 }
    );
  }
}