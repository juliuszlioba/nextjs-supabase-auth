import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UpdatePassword from "@/components/Auth/UpdatePassword";

import type { Database } from "@/lib/database.types";

export default async function UpdatePasswordPage() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

  return <UpdatePassword />;
}
