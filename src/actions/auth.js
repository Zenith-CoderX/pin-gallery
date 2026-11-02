"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { loginSchema, signupSchema } from "@/lib/schemas";
import { createUser, findUserByEmail, verifyPassword, DUMMY_HASH } from "@/lib/db";
import { createSession, deleteSession } from "@/lib/session";

function safeRedirectPath(p) {
  if (typeof p !== "string") return "/";
  if (!p.startsWith("/") || p.startsWith("//") || p.includes("\\")) return "/";
  return p;
}

export async function signup(input) {
  const parsed = signupSchema.safeParse(input);
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }
  const { name, email, password } = parsed.data;

  const result = await createUser({ name, email, password });
  if (result.duplicate) {
    return { fieldErrors: { email: ["An account with this email already exists"] } };
  }
  await createSession(result.user);
  redirect("/");
}

export async function login(input, callbackUrl) {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }
  const { email, password } = parsed.data;

  const user = await findUserByEmail(email);
  const ok = await verifyPassword(password, user ? user.passwordHash : DUMMY_HASH);
  if (!user || !ok) return { message: "Incorrect email or password" };

  await createSession(user);
  redirect(safeRedirectPath(callbackUrl));
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
