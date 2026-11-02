import { getCurrentUser } from "@/lib/dal";
import { listImages } from "@/lib/images";
import DeleteButton from "@/components/delete-button";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const user = await getCurrentUser(); // real access gate
  const images = await listImages();
  const isAdmin = user.role === "admin";

  if (!images.length) {
    return (
      <main className="page">
        <div className="empty">
          <h1>No images yet</h1>
          <p className="muted">
            {isAdmin ? "Use “Add image” at the top to publish the first one." : "Check back soon."}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="masonry">
        {images.map((img) => (
          <figure className="pin" key={img.id}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.url} alt={img.title || "Gallery image"} loading="lazy" />
            <figcaption className="pin-over">
              {img.title ? <span className="pin-title">{img.title}</span> : <span />}
              {isAdmin ? <DeleteButton id={img.id} /> : null}
            </figcaption>
          </figure>
        ))}
      </div>
    </main>
  );
}
