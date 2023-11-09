import supabaseServerClient from "@/lib/supabase";
import { redirect } from "next/navigation";
import SignIn from "@/components/Auth/SignIn";

export default async function SignInPage() {
  const supabase = await supabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }

  return <SignIn />;
}
