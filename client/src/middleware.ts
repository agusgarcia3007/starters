import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const isAuthPage =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/signup";

  // If trying to access protected route without token, redirect to login
  if (!token && !isAuthPage) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If trying to access auth pages with token, redirect to protected
  if (token && isAuthPage) {
    const protectedUrl = new URL("/protected", request.url);
    return NextResponse.redirect(protectedUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/protected/:path*", "/login", "/signup"],
};
