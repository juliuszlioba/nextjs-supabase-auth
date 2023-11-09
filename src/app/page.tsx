import supabaseServerClient from "@/lib/supabase";
import { redirect } from "next/navigation";
import Link from "next/link";
import SignOut from "@/components/SignOut";

export default async function Home() {
  const supabase = await supabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const { data: users } = await supabase
    .from("users")
    .select("permission")
    .eq("id", user.id)
    .single();

  return (
    <div className="card">
      <h2 className="w-full text-center text-xl">Welcome!</h2>
      <code className="highlight">
        {user.role} : {users?.permission}
      </code>
      <div className="flex gap-2">
        <Link className="button" href="/profile">
          Go to Profile
        </Link>
        <Link className="button" href="/update-password">
          Update password
        </Link>
        <SignOut />
      </div>
    </div>
  );
}
