import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "@/lib/database.types";

/**
 * Any Server Component route that uses a Supabase client must be added to this
 * middleware's `matcher` array. Without this, the Server Component may try to make a
 * request to Supabase with an expired `access_token`.
 */
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  await supabase.auth.getSession();
  return res;
}

export const config = {
  matcher: ["/", "/profile"],
};
