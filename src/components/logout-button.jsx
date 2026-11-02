import { logout } from "@/actions/auth";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button className="btn btn-grey">Log out</button>
    </form>
  );
}
