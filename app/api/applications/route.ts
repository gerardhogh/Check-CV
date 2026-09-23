import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { jobOfferId } = await req.json();

    if (!jobOfferId) {
      return NextResponse.json({ error: "jobOfferId requis" }, { status: 400 });
    }

    // Get Talent Profile
    let talentProfile = await prisma.talentProfile.findUnique({
      where: { userId }
    });

    if (!talentProfile) {
      // Auto-create for demo/testing purposes
      talentProfile = await prisma.talentProfile.create({
        data: { userId }
      });
    }

    // Check if application already exists
    const existingApplication = await prisma.application.findFirst({
      where: {
        talentId: talentProfile.id,
        jobOfferId: jobOfferId
      }
    });

    if (existingApplication) {
      return NextResponse.json({ error: "Vous avez déjà postulé à cette offre" }, { status: 400 });
    }

    // Create the application
    const application = await prisma.application.create({
      data: {
        talentId: talentProfile.id,
        jobOfferId: jobOfferId,
        status: "PENDING"
      }
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error("Erreur POST /api/applications:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { searchParams } = new URL(req.url);
    const role = searchParams.get('role'); // "talent" or "recruiter"

    if (role === 'recruiter') {
      const recruiterProfile = await prisma.recruiterProfile.findUnique({
        where: { userId }
      });

      if (!recruiterProfile) {
        return NextResponse.json([]);
      }

      const applications = await prisma.application.findMany({
        where: {
          jobOffer: {
            recruiterId: recruiterProfile.id
          }
        },
        include: {
          talent: {
            include: {
              user: true
            }
          },
          jobOffer: true
        },
        orderBy: { createdAt: "desc" }
      });
      return NextResponse.json(applications);
    } else {
      // default: talent
      const talentProfile = await prisma.talentProfile.findUnique({
        where: { userId }
      });

      if (!talentProfile) {
        return NextResponse.json([]);
      }

      const applications = await prisma.application.findMany({
        where: { talentId: talentProfile.id },
        include: {
          jobOffer: {
            include: {
              recruiter: true
            }
          }
        },
        orderBy: { createdAt: "desc" }
      });
      return NextResponse.json(applications);
    }
  } catch (error) {
    console.error("Erreur GET /api/applications:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
