import supabaseServerClient from "@/lib/supabase";
import Link from "next/link";
import { redirect } from "next/navigation";
import SignOut from "@/components/SignOut";

export default async function Profile() {
  const supabase = await supabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="card">
      <h2 className="w-full text-center text-xl">User Profile</h2>
      <code className="highlight">{user.email}</code>
      <div className="heading">Last Signed In:</div>
      <code className="highlight">
        {user.last_sign_in_at && new Date(user.last_sign_in_at).toUTCString()}
      </code>
      <div className="flex gap-2">
        <Link className="button" href="/">
          Go Home
        </Link>
        <SignOut />
      </div>
    </div>
  );
}
