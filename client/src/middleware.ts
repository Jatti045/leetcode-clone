import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  let decodedToken;
  let isAuthenticated = false;

  if (accessToken) {
    try {
      decodedToken = await jwtVerify(accessToken, secret);
      if (decodedToken) {
        isAuthenticated = true;
      }
    } catch (error) {
      console.error(error);
    }
  }

  console.log(decodedToken);

  const premium = decodedToken?.payload?.premium;

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/problems", request.nextUrl));
  }

  if (
    (isAuthenticated && pathname === "/login") ||
    (isAuthenticated && pathname === "/register")
  ) {
    return NextResponse.redirect(new URL("/problems", request.nextUrl));
  }

  if (!isAuthenticated && pathname === "/subscribe") {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (isAuthenticated && premium && pathname === "/subscribe") {
    return NextResponse.redirect(new URL("/problems", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/subscribe", "/"],
};
