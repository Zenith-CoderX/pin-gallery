import Link from "next/link";
import SignupForm from "@/components/signup-form";

export const metadata = { title: "Sign up · Pin Gallery" };

export default function SignupPage() {
  return (
    <main className="auth">
      <div className="auth-card">
        <span className="brand-dot big" aria-hidden="true">P</span>
        <h1>Create your account</h1>
        <p className="muted">Sign up to browse the gallery.</p>
        <SignupForm />
        <p className="muted small">
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </div>
    </main>
  );
}
