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

    const filters: any = { isNot: null };
    if (degree) filters.degree = degree;
    if (gender) filters.gender = gender;
    if (country) filters.country = country;
    if (city) filters.city = city;

    // Return users that have a TalentProfile
    const talents = await prisma.user.findMany({
      where: {
        talentProfile: filters,
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

    const formattedTalents = talents.map((t: any, index) => ({
      id: t.id,
      no: (index + 1).toString().padStart(2, '0'),
      name: t.name || "Talent Anonyme",
      email: t.email || "",
      contact: t.talentProfile?.phone || "Non spécifié",
      date: new Date(t.createdAt).toLocaleDateString('fr-FR'),
      status: t.active ? "Actif" : "Suspendu",
      videoOk: !!t.talentProfile?.videoUrl,
      domaine: t.talentProfile?.degree || "Général",
      location: (t.talentProfile?.city && t.talentProfile?.country) 
        ? `${t.talentProfile.city}, ${t.talentProfile.country}` 
        : (t.talentProfile?.city || t.talentProfile?.country || "Non spécifié"),
      profession: t.talentProfile?.bio?.substring(0, 30) || "Talent", 
      imageUrl: t.image || "/assets/avatar_africain.jpg",
      isVerified: true,
      skills: t.talentProfile?.skills ? JSON.parse(t.talentProfile.skills) : [],
    }));

    return NextResponse.json(formattedTalents);
  } catch (error) {
    console.error("Erreur GET /api/talents:", error);
    return NextResponse.json({ error: "Erreur lors de la récupération des talents" }, { status: 500 });
  }
}
