import Link from "next/link";
import LoginForm from "@/components/login-form";

export const metadata = { title: "Log in · Pin Gallery" };

export default async function LoginPage({ searchParams }) {
  const { callbackUrl } = await searchParams;
  return (
    <main className="auth">
      <div className="auth-card">
        <span className="brand-dot big" aria-hidden="true">P</span>
        <h1>Welcome back</h1>
        <p className="muted">Log in to see the gallery.</p>
        <LoginForm callbackUrl={typeof callbackUrl === "string" ? callbackUrl : undefined} />
        <p className="muted small">
          New here? <Link href="/signup">Create an account</Link>
        </p>
      </div>
    </main>
  );
}
