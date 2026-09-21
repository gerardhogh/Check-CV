import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Return users that have a TalentProfile
    const talents = await prisma.user.findMany({
      where: {
        talentProfile: {
          isNot: null
        }
      },
      include: {
        talentProfile: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(talents);
  } catch (error) {
    console.error("Erreur GET /api/talents:", error);
    return NextResponse.json({ error: "Erreur lors de la récupération des talents" }, { status: 500 });
  }
}
