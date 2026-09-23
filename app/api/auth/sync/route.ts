import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const { access_token, roleParam } = await request.json();

    if (!access_token) {
      return NextResponse.json(
        { error: "Access token manquant" },
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
    const name =
      supabaseUser.user_metadata?.full_name ||
      supabaseUser.user_metadata?.name ||
      email.split("@")[0];
    const image = supabaseUser.user_metadata?.avatar_url || null;

    // Synchronisation avec Prisma
    let user = await prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });

    if (!user) {
      const roleName = roleParam === "recruteur" ? "RECRUTEUR" : "TALENT";
      let role = await prisma.role.findUnique({
        where: { name: roleName },
      });

      if (!role) {
        role = await prisma.role.create({
          data: {
            name: roleName,
            permissions: JSON.stringify([]),
          },
        });
      }

      const randomPassword = crypto.randomUUID();
      const passwordHash = await bcrypt.hash(randomPassword, 10);

      user = await prisma.user.create({
        data: {
          name,
          email,
          image,
          passwordHash,
          roleId: role.id,
          emailVerified: new Date(),
        },
        include: { role: true },
      });

      if (roleName === "RECRUTEUR") {
        await prisma.recruiterProfile.create({ data: { userId: user.id } });
      } else {
        await prisma.talentProfile.create({ data: { userId: user.id } });
      }
    } else {
      // Le user existe déjà. On met à jour ses infos et potentiellement son rôle
      // s'il essaie de se connecter via un autre onglet (ex: Talent -> Recruteur)
      const targetRoleName = roleParam === "recruteur" ? "RECRUTEUR" : "TALENT";
      let targetRole = await prisma.role.findUnique({ where: { name: targetRoleName } });

      if (!targetRole) {
        targetRole = await prisma.role.create({
          data: { name: targetRoleName, permissions: JSON.stringify([]) },
        });
      }

      await prisma.user.update({
        where: { email },
        data: {
          name: name || user.name,
          image: image || user.image,
          emailVerified: user.emailVerified || new Date(),
          roleId: targetRole.id,
        },
      });

      // S'assurer que le profil spécifique existe
      if (targetRoleName === "RECRUTEUR") {
        const profile = await prisma.recruiterProfile.findUnique({ where: { userId: user.id } });
        if (!profile) await prisma.recruiterProfile.create({ data: { userId: user.id } });
      } else {
        const profile = await prisma.talentProfile.findUnique({ where: { userId: user.id } });
        if (!profile) await prisma.talentProfile.create({ data: { userId: user.id } });
      }

      // Mettre à jour l'objet local pour la redirection
      user.role = targetRole;
    }

    // Déterminer la redirection basée sur le nouveau rôle
    const userRole = user.role?.name || "TALENT";
    const redirectPath =
      userRole === "ADMIN"
        ? "/dashboard/admin"
        : userRole === "RECRUTEUR"
        ? "/dashboard/recruteur"
        : "/dashboard/talent";

    // Générer le HMAC Token
    const timestamp = Date.now().toString();
    const secret = process.env.NEXTAUTH_SECRET || "fallback-secret";
    const signature = crypto
      .createHmac("sha256", secret)
      .update(`${email}:${timestamp}`)
      .digest("hex");
    const hmacToken = `${timestamp}:${signature}`;

    return NextResponse.json({
      email,
      token: hmacToken,
      redirect: redirectPath,
    });
  } catch (error) {
    console.error("Erreur sync route:", error);
    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 }
    );
  }
}
