import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const logs = await prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50 // Limit to last 50 for now
    });
    return NextResponse.json(logs);
  } catch (error) {
    console.error("Erreur GET /api/audit-logs:", error);
    return NextResponse.json({ error: "Erreur lors de la récupération des logs d'audit" }, { status: 500 });
  }
}
