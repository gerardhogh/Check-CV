import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const degree = searchParams.get('degree') || '';
    const gender = searchParams.get('gender') || '';
    const country = searchParams.get('country') || '';
    const city = searchParams.get('city') || '';

    // Return users that have a TalentProfile
    const talents = await prisma.user.findMany({
      where: {
        talentProfile: {
          isNot: null,
          ...(degree ? { degree } : {}),
          ...(gender ? { gender } : {}),
          ...(country ? { country } : {}),
          ...(city ? { city } : {})
        },
        ...(query ? {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { talentProfile: { bio: { contains: query, mode: 'insensitive' } } },
            { talentProfile: { skills: { contains: query, mode: 'insensitive' } } },
          ]
        } : {})
      },
      include: {
        talentProfile: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const formattedTalents = talents.map(t => ({
      id: t.id,
      name: t.name || "Talent Anonyme",
      location: "Non spécifié", // Placeholder since location isn't in schema yet
      profession: t.talentProfile?.bio?.substring(0, 30) || "Talent", 
      imageUrl: t.image || "/assets/candidate-alicia-parker.jpg",
      isVerified: true,
      skills: t.talentProfile?.skills ? JSON.parse(t.talentProfile.skills) : [],
    }));

    return NextResponse.json(formattedTalents);
  } catch (error) {
    console.error("Erreur GET /api/talents:", error);
    return NextResponse.json({ error: "Erreur lors de la récupération des talents" }, { status: 500 });
  }
}
