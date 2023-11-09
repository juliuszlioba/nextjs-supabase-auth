"use client";

import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

import type { Database } from "@/lib/database.types";

export default function SignOut() {
  const router = useRouter();
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();

    router.refresh();

    if (error) {
      // eslint-disable-next-line no-console
      console.error("ERROR:", error);
    }
  }

  return (
    <button type="button" className="button" onClick={handleSignOut}>
      Sign Out
    </button>
  );
}
