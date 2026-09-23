import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  // Seul un ADMIN peut modifier le rôle d'un autre utilisateur
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Accès refusé. Action réservée aux administrateurs." },
      { status: 403 }
    );
  }

  const body = await req.json();

  const updatedUser = await prisma.user.update({
    where: { id: params.id },
    data: {
      roleId: body.roleId,
      name: body.name,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  return NextResponse.json(updatedUser);
}