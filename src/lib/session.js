import "server-only";
import { cookies } from "next/headers";
import { signToken, verifyToken } from "./token";

export const SESSION_COOKIE = "session";

export async function createSession(user) {
  const token = await signToken({ sub: user.id, name: user.name, role: user.role });
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
}

export async function getSession() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function deleteSession() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}
