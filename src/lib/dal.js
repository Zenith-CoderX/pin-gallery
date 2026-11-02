import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { getSession } from "./session";
import { findUserById } from "./db";

export const verifySession = cache(async () => {
  const session = await getSession();
  if (!session?.sub) redirect("/login");
  return { userId: session.sub };
});

// Re-reads the user from the database so role changes apply immediately.
export const getCurrentUser = cache(async () => {
  const { userId } = await verifySession();
  const user = await findUserById(userId);
  if (!user) redirect("/login");
  return { id: user.id, name: user.name, email: user.email, role: user.role };
});

export const requireAdmin = cache(async () => {
  const user = await getCurrentUser();
  if (user.role !== "admin") redirect("/");
  return user;
});
