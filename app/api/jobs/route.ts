import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const jobs = await prisma.jobOffer.findMany({
      where: {
        status: "PUBLISHED"
      },
      include: {
        recruiter: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Erreur lors de la récupération des offres:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();

    // S'assurer que le RecruiterProfile existe pour cet utilisateur
    let recruiterProfile = await prisma.recruiterProfile.findUnique({
      where: { userId }
    });

    if (!recruiterProfile) {
      // Auto-create for demo purposes if it doesn't exist
      recruiterProfile = await prisma.recruiterProfile.create({
        data: {
          userId,
          companyName: body.entreprise || "Entreprise",
        }
      });
    }

    const newJob = await prisma.jobOffer.create({
      data: {
        title: body.titre,
        description: body.description,
        location: body.lieu,
        contractType: body.typeEmploi,
        status: "PUBLISHED", // Visible immédiatement par les Talents
        recruiterId: recruiterProfile.id,
      }
    });

    // Invalider le cache de la page talent pour forcer le rechargement
    revalidatePath("/dashboard/talent");

    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création de l'offre:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
