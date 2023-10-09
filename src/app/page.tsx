import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import SignOut from "@/components/SignOut";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="card">
      <h2>Welcome!</h2>
      <code className="highlight">{user.role}</code>
      <Link className="button" href="/profile">
        Go to Profile
      </Link>
      <Link className="button" href="/update-password">
        Update password
      </Link>
      <SignOut />
    </div>
  );
}
