import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const { access_token, password } = await request.json();

    if (!access_token || !password) {
      return NextResponse.json(
        { error: "Access token ou mot de passe manquant" },
        { status: 400 }
      );
    }

    // Initialiser le client Supabase serveur
    const supabaseServer = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Récupérer l'utilisateur avec le token pour vérifier son authenticité
    const {
      data: { user: supabaseUser },
      error: authError,
    } = await supabaseServer.auth.getUser(access_token);

    if (authError || !supabaseUser) {
      console.error("Erreur vérification token Supabase:", authError);
      return NextResponse.json(
        { error: "Token invalide ou expiré" },
        { status: 401 }
      );
    }

    const email = supabaseUser.email!;

    // Hacher le nouveau mot de passe
    const passwordHash = await bcrypt.hash(password, 10);

    // Mettre à jour l'utilisateur dans Prisma
    await prisma.user.update({
      where: { email },
      data: { passwordHash },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur update-password route:", error);
    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 }
    );
  }
}
