import supabaseServerClient from "@/lib/supabase";
import { redirect } from "next/navigation";
import UpdatePassword from "@/components/Auth/UpdatePassword";

export default async function UpdatePasswordPage() {
  const supabase = await supabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

  return <UpdatePassword />;
}
