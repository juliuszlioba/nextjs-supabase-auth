// More info: https://supabase.com/docs/guides/auth/server-side/email-based-auth-with-pkce-flow-for-ssr?framework=nextjs

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "@/lib/database.types";
import { EmailOtpType } from "@supabase/supabase-js";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType;
  const next = searchParams.get("next") ?? "/";

  if (token_hash && type) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient<Database>({
      cookies: () => cookieStore,
    });
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error) {
      return NextResponse.redirect(new URL(`/${next.slice(1)}`, req.url));
    }
  }

  // return the user to an error page with some instructions
  return NextResponse.redirect(new URL("/auth/auth-error", req.url));
}
