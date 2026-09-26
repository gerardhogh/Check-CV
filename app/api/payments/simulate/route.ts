import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const userId = session.user.id;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { isPremium: true },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Erreur simulation paiement:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'activation du premium" },
      { status: 500 }
    );
  }
}
