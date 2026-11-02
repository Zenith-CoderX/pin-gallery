"use client";

import { useTransition } from "react";
import { deleteImage } from "@/actions/gallery";

export default function DeleteButton({ id }) {
  const [pending, start] = useTransition();
  return (
    <button
      className="pin-delete"
      disabled={pending}
      aria-label="Delete image"
      onClick={() => {
        if (!confirm("Delete this image?")) return;
        start(async () => {
          const res = await deleteImage(id);
          if (res?.error) alert(res.error);
        });
      }}
    >
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
