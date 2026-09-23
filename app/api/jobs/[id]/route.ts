import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// DELETE : Supprimer une offre (Créateur de l'offre ou ADMIN uniquement)
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Vous devez être connecté pour effectuer cette action." },
      { status: 401 }
    );
  }

  try {
    const job = await prisma.jobOffer.findUnique({
      where: { id },
      include: { recruiter: true },
    });

    if (!job) {
      return NextResponse.json(
        { error: "Offre d'emploi introuvable." },
        { status: 404 }
      );
    }

    // Vérification : L'utilisateur doit être le créateur de l'offre ou un ADMIN
    const isOwner = job.recruiter?.userId === session.user.id;
    const isAdmin = session.user.role === "ADMIN";

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: "Vous n'avez pas la permission de supprimer cette offre." },
        { status: 403 }
      );
    }

    await prisma.jobOffer.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Offre supprimée avec succès." });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la suppression de l'offre." },
      { status: 500 }
    );
  }
}