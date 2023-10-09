import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import SignOut from "@/components/SignOut";

import type { Database } from "@/lib/database.types";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  return (
    <div className="card">
      <h2>Welcome!</h2>
      <code className="highlight">
        {user.role} : {profile?.role}
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
