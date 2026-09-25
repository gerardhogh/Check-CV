import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Rediriger si l'accès à l'espace Admin est tenté par un non-ADMIN
    if (path.startsWith("/dashboard/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Rediriger si l'accès à l'espace Recruteur est tenté par un rôle non autorisé
    if (
      (path.startsWith("/dashboard/recruiter") || path.startsWith("/dashboard/recruteur")) &&
      !["RECRUTEUR", "ADMIN"].includes(token?.role as string)
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Rediriger si l'accès à l'espace Talent est tenté par un rôle non autorisé
    if (
      path.startsWith("/dashboard/talent") &&
      !["TALENT", "ADMIN"].includes(token?.role as string)
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/connexion",
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/interview/:path*",
  ],
};