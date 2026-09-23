import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET : Récupérer toutes les offres d'emploi
export async function GET() {
  try {
    const jobs = await prisma.jobOffer.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des offres." },
      { status: 500 }
    );
  }
}

// POST : Créer une nouvelle offre (RECRUITER ou ADMIN uniquement)
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  // Vérification stricte des droits
  if (!session || !["RECRUITER", "ADMIN"].includes(session.user?.role || "")) {
    return NextResponse.json(
      { error: "Accès refusé. Seuls les recruteurs et administrateurs peuvent publier une offre." },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const { title, description, location, salary, contractType } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Le titre et la description sont obligatoires." },
        { status: 400 }
      );
    }

    // Récupérer le profil recruteur lié à l'utilisateur connecté
    const recruiterProfile = await prisma.recruiterProfile.findFirst({
      where: { userId: session.user.id },
    });

    if (!recruiterProfile) {
      return NextResponse.json(
        { error: "Profil recruteur introuvable." },
        { status: 404 }
      );
    }

    const newJob = await prisma.jobOffer.create({
      data: {
        title,
        description,
        location,
        salary,
        contractType,
        status: "PUBLISHED",
        recruiterId: recruiterProfile.id,
      },
    });

    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la création de l'offre." },
      { status: 500 }
    );
  }
}