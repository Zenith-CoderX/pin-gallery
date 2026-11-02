// Safe to import from the proxy (no next/headers, no server-only).
import { SignJWT, jwtVerify } from "jose";

const secret = process.env.SESSION_SECRET;
if (!secret) throw new Error("Missing SESSION_SECRET in .env.local");
const key = new TextEncoder().encode(secret);

export async function signToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"] });
    return payload;
  } catch {
    return null;
  }
}
