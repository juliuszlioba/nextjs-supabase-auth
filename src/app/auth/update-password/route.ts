import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "@/lib/database.types";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient<Database>({
      cookies: () => cookieStore,
    });
    await supabase.auth.exchangeCodeForSession(code);

    return NextResponse.redirect(`${requestUrl.origin}/update-password`);
  }

  // eslint-disable-next-line no-console
  console.error("ERROR: Invalid auth code or no auth code found");

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(`${requestUrl.origin}/sign-in`);
}
