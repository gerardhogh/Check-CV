import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    
    const formData = await req.formData();
    const file = formData.get("cv") as File;

    if (!file) {
      return NextResponse.json({ error: "Aucun fichier fourni" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Nom de fichier unique pour éviter les collisions
    const fileName = `${userId}-${Date.now()}-${file.name.replace(/\\s+/g, '_')}`;
    
    // Chemin local (pour le développement ou serveur VPS)
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'cvs');
    
    // Créer le dossier s'il n'existe pas
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);
    
    // Sauvegarde physique du fichier
    fs.writeFileSync(filePath, buffer);

    // URL publique
    const fileUrl = `/uploads/cvs/${fileName}`;

    // S'assurer que le TalentProfile existe pour cet utilisateur
    let talentProfile = await prisma.talentProfile.findUnique({
      where: { userId }
    });

    if (!talentProfile) {
      talentProfile = await prisma.talentProfile.create({
        data: {
          userId,
          cvUrl: fileUrl
        }
      });
    } else {
      talentProfile = await prisma.talentProfile.update({
        where: { userId },
        data: { cvUrl: fileUrl }
      });
    }

    return NextResponse.json({ 
      success: true, 
      cvUrl: fileUrl,
      fileName: file.name
    });
  } catch (error) {
    console.error("Erreur POST /api/talents/cv:", error);
    return NextResponse.json({ error: "Erreur lors de l'upload du CV" }, { status: 500 });
  }
}
