import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/token";

const isProtected = (p) => p === "/" || p === "/admin" || p.startsWith("/admin/");
const isAuthRoute = (p) => p === "/login" || p === "/signup";

export async function proxy(request) {
  const { pathname, search } = request.nextUrl;
  const token = request.cookies.get("session")?.value;
  const session = token ? await verifyToken(token) : null;

  if (isProtected(pathname) && !session) {
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", pathname + search);
    const res = NextResponse.redirect(url);
    if (token) res.cookies.delete("session"); // expired or tampered
    return res;
  }
  if (isAuthRoute(pathname) && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
