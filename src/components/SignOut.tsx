"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function SignOut() {
  const supabase = createClientComponentClient();

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();

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
