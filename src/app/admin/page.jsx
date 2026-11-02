import Link from "next/link";
import { requireAdmin } from "@/lib/dal";
import UploadForm from "@/components/upload-form";

export const metadata = { title: "Add image · Pin Gallery" };

export default async function AdminPage() {
  await requireAdmin();
  return (
    <main className="page narrow">
      <Link href="/" className="muted small">← Back to gallery</Link>
      <h1>Add an image</h1>
      <UploadForm />
    </main>
  );
}
