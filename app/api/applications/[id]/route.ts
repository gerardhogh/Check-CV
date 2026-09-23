import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json();

    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        jobOffer: {
          include: {
            recruiter: true
          }
        }
      }
    });

    if (!application) {
      return NextResponse.json({ error: "Candidature non trouvée" }, { status: 404 });
    }

    const userId = (session.user as any).id;
    if (application.jobOffer.recruiter.userId !== userId) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
    }

    const updated = await prisma.application.update({
      where: { id },
      data: {
        status: body.status // "ACCEPTED", "REJECTED", "PENDING"
      }
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Erreur PATCH /api/applications/[id]:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { id } = params;

    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        jobOffer: {
          include: {
            recruiter: true
          }
        }
      }
    });

    if (!application) {
      return NextResponse.json({ error: "Candidature non trouvée" }, { status: 404 });
    }

    const userId = (session.user as any).id;
    if (application.jobOffer.recruiter.userId !== userId) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
    }

    await prisma.application.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur DELETE /api/applications/[id]:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
