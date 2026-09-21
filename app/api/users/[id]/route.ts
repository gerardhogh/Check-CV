import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();
    const { active, roleId } = body;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...(active !== undefined && { active }),
        ...(roleId !== undefined && { roleId })
      },
      include: { role: true }
    });

    // Add Audit Log
    let actionDesc = `Utilisateur "${updatedUser.name}" modifié`;
    if (active !== undefined) {
      actionDesc = `Utilisateur "${updatedUser.name}" ${active ? 'activé' : 'suspendu'}`;
    } else if (roleId !== undefined) {
      actionDesc = `Rôle modifié pour "${updatedUser.name}"`;
    }

    await prisma.auditLog.create({
      data: {
        action: actionDesc,
        by: "Jean Dupont\n(Administrateur)", // TODO: get from session
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Erreur PUT /api/users/[id]:", error);
    return NextResponse.json({ error: "Erreur lors de la mise à jour de l'utilisateur" }, { status: 500 });
  }
}
