import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ResetPassword from "@/components/Auth/ResetPassword";

import type { Database } from "@/lib/database.types";

export default async function ResetPasswordPage() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }

  return <ResetPassword />;
}
