import supabaseServerClient from "@/lib/supabase";
import { redirect } from "next/navigation";
import SignUp from "@/components/Auth/SignUp";

export default async function SignUpPage() {
  const supabase = await supabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }

  return <SignUp />;
}
