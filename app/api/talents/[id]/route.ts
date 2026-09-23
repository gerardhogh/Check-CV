import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const talentUser = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        talentProfile: {
          include: {
            interviewSessions: {
              include: {
                interview: true,
              },
            },
          },
        },
      },
    });

    if (!talentUser) {
      return NextResponse.json({ error: "Talent introuvable" }, { status: 404 });
    }

    // Format the data to send to the frontend
    const profile = talentUser.talentProfile;
    
    // Check if we have an interview session
    const interviewSession = profile?.interviewSessions?.[0]; // Taking the first one if it exists

    const formattedTalent = {
      id: talentUser.id,
      name: talentUser.name || "Talent Anonyme",
      email: talentUser.email || "",
      contact: profile?.phone || "Non spécifié",
      date: new Date(talentUser.createdAt).toLocaleDateString('fr-FR'),
      status: talentUser.active ? "Actif" : "Suspendu",
      videoUrl: profile?.videoUrl,
      domaine: profile?.degree || "Général",
      location: (profile?.city && profile?.country) 
        ? `${profile.city}, ${profile.country}` 
        : (profile?.city || profile?.country || "Non spécifié"),
      profession: profile?.bio?.substring(0, 30) || "Talent", 
      bio: profile?.bio || "Aucune biographie",
      imageUrl: talentUser.image || "/assets/avatar_africain.jpg",
      cvUrl: profile?.cvUrl || "",
      isVerified: true,
      skills: profile?.skills ? JSON.parse(profile.skills) : [],
      gender: profile?.gender || "Non précisé",
      
      // Interview details
      interviewSession: interviewSession ? {
        id: interviewSession.id,
        status: interviewSession.status,
        videoRecordings: interviewSession.videoRecordings,
        aiScore: interviewSession.aiScore,
        aiFeedback: interviewSession.aiFeedback,
      } : null,
    };

    return NextResponse.json(formattedTalent);
  } catch (error) {
    console.error("Erreur GET /api/talents/[id]:", error);
    return NextResponse.json({ error: "Erreur lors de la récupération du talent" }, { status: 500 });
  }
}
