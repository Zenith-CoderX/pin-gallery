"use client";

import { useRef, useState } from "react";
import { uploadImage } from "@/actions/gallery";

export default function UploadForm() {
  const formRef = useRef(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  function onFile(e) {
    const f = e.target.files?.[0];
    setDone(false);
    setPreview(f ? URL.createObjectURL(f) : "");
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setDone(false);
    setBusy(true);
    const res = await uploadImage(new FormData(formRef.current));
    setBusy(false);
    if (res?.error) return setError(res.error);
    formRef.current.reset();
    setPreview("");
    setDone(true);
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="upload">
      <label className="drop" htmlFor="file">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Preview of the selected image" />
        ) : (
          <span>Choose an image<br /><small>JPG, PNG, WebP or GIF, up to 5 MB</small></span>
        )}
      </label>
      <input id="file" name="file" type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={onFile} className="sr-only" />
      <div className="upload-side">
        <div className="field">
          <label htmlFor="title">Title (optional)</label>
          <input id="title" name="title" maxLength={120} />
        </div>
        {error ? <p className="field-error" role="alert">{error}</p> : null}
        {done ? <p className="ok" role="status">Image added to the gallery.</p> : null}
        <button className="btn btn-red" disabled={busy}>{busy ? "Uploading…" : "Publish"}</button>
      </div>
    </form>
  );
}
