import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import type { Database } from "@/lib/database.types";

export default async function SignUpPage() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }

  return (
    <main className="card">
      <h2>Authentication error</h2>
      <Link className="button" href="/">
        Go Home
      </Link>
    </main>
  );
}
