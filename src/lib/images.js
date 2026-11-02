import "server-only";
import { supabase } from "./supabase-admin";

export const BUCKET = "images";

export async function listImages() {
  const { data, error } = await supabase
    .from("images")
    .select("id, title, path, created_at")
    .order("created_at", { ascending: false });
  if (error) throw error;
  if (!data.length) return [];

  const { data: signed, error: signError } = await supabase.storage
    .from(BUCKET)
    .createSignedUrls(data.map((i) => i.path), 60 * 60);
  if (signError) throw signError;

  const urlByPath = new Map(signed.map((s) => [s.path, s.signedUrl]));
  return data
    .map((i) => ({ id: i.id, title: i.title, url: urlByPath.get(i.path) }))
    .filter((i) => i.url);
}
