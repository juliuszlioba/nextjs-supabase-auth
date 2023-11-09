import supabaseServerClient from "@/lib/supabase";
import { redirect } from "next/navigation";
import ResetPassword from "@/components/Auth/ResetPassword";

export default async function ResetPasswordPage() {
  const supabase = await supabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }

  return <ResetPassword />;
}
