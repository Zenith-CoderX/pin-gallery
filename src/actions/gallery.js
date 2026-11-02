"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/dal";
import { uploadSchema } from "@/lib/schemas";
import { supabase } from "@/lib/supabase-admin";
import { BUCKET } from "@/lib/images";

const EXT = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif" };

export async function uploadImage(formData) {
  await requireAdmin();

  const parsed = uploadSchema.safeParse({
    title: formData.get("title") ?? "",
    file: formData.get("file"),
  });
  if (!parsed.success) {
    const fe = z.flattenError(parsed.error).fieldErrors;
    return { error: fe.file?.[0] || fe.title?.[0] || "Invalid upload" };
  }
  const { title, file } = parsed.data;
  const path = `${crypto.randomUUID()}.${EXT[file.type]}`;

  const { error: upErr } = await supabase.storage
    .from(BUCKET)
    .upload(path, Buffer.from(await file.arrayBuffer()), { contentType: file.type });
  if (upErr) return { error: "Upload failed. Try again." };

  const { error: dbErr } = await supabase.from("images").insert({ title, path });
  if (dbErr) {
    await supabase.storage.from(BUCKET).remove([path]);
    return { error: "Could not save the image. Try again." };
  }

  revalidatePath("/");
  return { ok: true };
}

export async function deleteImage(id) {
  await requireAdmin();
  const parsedId = z.uuid().safeParse(id);
  if (!parsedId.success) return { error: "Invalid image" };

  const { data } = await supabase.from("images").select("path").eq("id", parsedId.data).maybeSingle();
  if (!data) return { error: "Image not found" };

  await supabase.storage.from(BUCKET).remove([data.path]);
  const { error } = await supabase.from("images").delete().eq("id", parsedId.data);
  if (error) return { error: "Could not delete the image" };

  revalidatePath("/");
  return { ok: true };
}
