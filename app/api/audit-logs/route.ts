import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET : Récupérer les journaux d'audit (ADMIN uniquement)
export async function GET() {
  const session = await getServerSession(authOptions);

  // Vérification des droits administrateur
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Accès refusé. Seuls les administrateurs peuvent consulter les journaux d'audit." },
      { status: 403 }
    );
  }

  try {
    const logs = await prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 100, // Limite aux 100 derniers événements pour des raisons de performance
    });

    return NextResponse.json(logs);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des journaux d'audit." },
      { status: 500 }
    );
  }
}