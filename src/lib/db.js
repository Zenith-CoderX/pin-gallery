import "server-only";
import bcrypt from "bcryptjs";
import { supabase } from "./supabase-admin";

// Keeps login timing similar when the email does not exist.
export const DUMMY_HASH = bcrypt.hashSync("dummy-password-for-timing", 12);

function toUser(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    passwordHash: row.password_hash,
    createdAt: row.created_at,
  };
}

export async function findUserByEmail(email) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email.toLowerCase().trim())
    .maybeSingle();
  if (error) throw error;
  return toUser(data);
}

export async function findUserById(id) {
  const { data, error } = await supabase.from("users").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return toUser(data);
}

// Returns { user } or { duplicate: true }
export async function createUser({ name, email, password }) {
  const password_hash = await bcrypt.hash(password, 12);
  const { data, error } = await supabase
    .from("users")
    .insert({ name, email: email.toLowerCase().trim(), password_hash, role: "user" })
    .select("*")
    .single();
  if (error) {
    if (error.code === "23505") return { duplicate: true };
    throw error;
  }
  return { user: toUser(data) };
}

export function verifyPassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}
