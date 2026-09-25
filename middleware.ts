import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  // Use getToken directly. It automatically handles secure cookies on production/HTTPS.
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  const path = req.nextUrl.pathname;

  // Si l'utilisateur n'est pas connecté, le rediriger vers la page de connexion
  if (!token) {
    const url = new URL("/connexion", req.url);
    url.searchParams.set("callbackUrl", encodeURI(req.url));
    return NextResponse.redirect(url);
  }

  // Rediriger si l'accès à l'espace Admin est tenté par un non-ADMIN
  if (path.startsWith("/dashboard/admin") && token.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Rediriger si l'accès à l'espace Recruteur est tenté par un rôle non autorisé
  if (
    (path.startsWith("/dashboard/recruiter") || path.startsWith("/dashboard/recruteur")) &&
    !["RECRUTEUR", "ADMIN"].includes(token.role as string)
  ) {
    return NextResponse.redirect(new URL("/dashboard/talent", req.url));
  }

  // Rediriger si l'accès à l'espace Talent est tenté par un rôle non autorisé
  if (
    path.startsWith("/dashboard/talent") &&
    !["TALENT", "ADMIN"].includes(token.role as string)
  ) {
    return NextResponse.redirect(new URL("/dashboard/recruteur", req.url));
  }

  // Si on accède à la racine du dashboard, on redirige vers le bon espace selon le rôle
  if (path === "/dashboard") {
    if (token.role === "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard/admin", req.url));
    } else if (token.role === "RECRUTEUR") {
      return NextResponse.redirect(new URL("/dashboard/recruteur", req.url));
    } else {
      return NextResponse.redirect(new URL("/dashboard/talent", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/interview/:path*",
  ],
};