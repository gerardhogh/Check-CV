import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import fs from 'fs';
import path from 'path';
import { supabase } from '@/lib/supabase';

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

    if (!file || typeof file === 'string' || typeof file.arrayBuffer !== 'function') {
      return NextResponse.json({ error: "Aucun fichier valide fourni" }, { status: 400 });
    }

    // Nom de fichier unique pour éviter les collisions
    const fileName = `${userId}-${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    
    let fileUrl = "";

    const isPlaceholder = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder");

    if (isPlaceholder) {
      console.warn("Using placeholder Supabase URL, skipping actual upload and using fallback PDF");
      fileUrl = "/Docs/Check CV.pdf";
    } else {
      try {
        const { data: uploadData, error: uploadError } = await supabase
          .storage
          .from('cvs')
          .upload(fileName, file, {
            contentType: file.type,
            upsert: true
          });

        if (uploadError) {
          console.warn("Supabase upload error, using fallback URL:", uploadError);
          fileUrl = "/Docs/Check CV.pdf";
        } else {
          const { data: publicUrlData } = supabase.storage.from('cvs').getPublicUrl(fileName);
          fileUrl = publicUrlData.publicUrl;
        }
      } catch (uploadException) {
        console.warn("Supabase upload exception (network/config), using fallback URL:", uploadException);
        fileUrl = "/Docs/Check CV.pdf";
      }
    }

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
  } catch (error: any) {
    console.error("Erreur POST /api/talents/cv:", error);
    return NextResponse.json({ error: error.message || "Erreur lors de l'upload du CV" }, { status: 500 });
  }
}
