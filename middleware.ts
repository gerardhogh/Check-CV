import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Rediriger si le rôle ne correspond pas au dashboard demandé
    if (path.startsWith("/dashboard/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/connexion", req.url));
    }
    if (path.startsWith("/dashboard/recruteur") && token?.role !== "RECRUTEUR" && token?.role !== "RECRUITER") {
      return NextResponse.redirect(new URL("/connexion", req.url));
    }
    if (path.startsWith("/dashboard/talent") && token?.role !== "TALENT") {
      return NextResponse.redirect(new URL("/connexion", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/connexion",
    }
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/interview/:path*"
  ],
};
