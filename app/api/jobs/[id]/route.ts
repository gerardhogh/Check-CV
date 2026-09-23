import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { id } = params;

    const job = await prisma.jobOffer.findUnique({
      where: { id },
      include: { recruiter: true }
    });

    if (!job) {
      return NextResponse.json({ error: "Offre non trouvée" }, { status: 404 });
    }

    // Verify ownership
    const userId = (session.user as any).id;
    if (job.recruiter.userId !== userId) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
    }

    await prisma.jobOffer.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur DELETE /api/jobs/[id]:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json();
    
    const job = await prisma.jobOffer.findUnique({
      where: { id },
      include: { recruiter: true }
    });

    if (!job) {
      return NextResponse.json({ error: "Offre non trouvée" }, { status: 404 });
    }

    // Verify ownership
    const userId = (session.user as any).id;
    if (job.recruiter.userId !== userId) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
    }

    const updatedJob = await prisma.jobOffer.update({
      where: { id },
      data: {
        status: body.status
      }
    });

    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error("Erreur PATCH /api/jobs/[id]:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json();
    
    const job = await prisma.jobOffer.findUnique({
      where: { id },
      include: { recruiter: true }
    });

    if (!job) {
      return NextResponse.json({ error: "Offre non trouvée" }, { status: 404 });
    }

    // Verify ownership
    const userId = (session.user as any).id;
    if (job.recruiter.userId !== userId) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
    }

    const updatedJob = await prisma.jobOffer.update({
      where: { id },
      data: {
        title: body.titre || body.title,
        description: body.description,
        location: body.lieu || body.location,
        contractType: body.typeEmploi || body.contractType,
      }
    });

    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error("Erreur PUT /api/jobs/[id]:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
