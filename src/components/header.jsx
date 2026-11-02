import Link from "next/link";
import { getSession } from "@/lib/session";
import LogoutButton from "./logout-button";

// Display only. Real access checks happen in the proxy, pages and actions.
export default async function Header() {
  const session = await getSession();
  return (
    <header className="header">
      <Link href="/" className="brand" aria-label="Home">
        <span className="brand-dot" aria-hidden="true">P</span>
        <span className="brand-name">Pin Gallery</span>
      </Link>
      <nav className="nav">
        {session ? (
          <>
            {session.role === "admin" ? (
              <Link href="/admin" className="btn btn-dark">Add image</Link>
            ) : null}
            <span className="who">{session.name}</span>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link href="/login" className="btn btn-red">Log in</Link>
            <Link href="/signup" className="btn btn-grey">Sign up</Link>
          </>
        )}
      </nav>
    </header>
  );
}
