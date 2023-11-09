import supabaseServerClient from "@/lib/supabase";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const supabase = await supabaseServerClient();
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
