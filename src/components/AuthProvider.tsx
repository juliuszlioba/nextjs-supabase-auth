"use client";

import { /* createContext, */ useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import type { Database } from "@/lib/database.types";

//export const AuthContext = createContext();

const AuthProvider = ({
  accessToken,
  children,
}: {
  accessToken: string | null;
  children: React.ReactNode;
}) => {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== accessToken) {
        router.refresh();
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, [accessToken, supabase, router]);

  return children;
};

export default AuthProvider;
