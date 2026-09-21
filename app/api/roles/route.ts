import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const roles = await prisma.role.findMany({
      include: {
        _count: {
          select: { users: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(roles);
  } catch (error) {
    console.error("Erreur GET /api/roles:", error);
    return NextResponse.json({ error: "Erreur lors de la récupération des rôles" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, permissions } = body;

    const newRole = await prisma.role.create({
      data: {
        name,
        description,
        permissions: JSON.stringify(permissions),
        active: true
      }
    });

    // Add Audit Log
    await prisma.auditLog.create({
      data: {
        action: `Rôle "${name}" créé`,
        by: "Jean Dupont\n(Administrateur)", // TODO: get from session
      }
    });

    return NextResponse.json(newRole, { status: 201 });
  } catch (error) {
    console.error("Erreur POST /api/roles:", error);
    return NextResponse.json({ error: "Erreur lors de la création du rôle" }, { status: 500 });
  }
}
