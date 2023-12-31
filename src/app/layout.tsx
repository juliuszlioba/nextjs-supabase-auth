import type { Metadata } from "next";

import supabaseServerClient from "@/lib/supabase";
import AuthProvider from "@/components/AuthProvider";

import "../styles/globals.css";
import ThemeToggle from "@/components/ThemeToggle";
import { getCurrentTheme } from "@/lib/colorTheme";

import { GeistSans } from "geist/font/sans";

// do not cache this layout
// export const revalidate = 0;

export const metadata: Metadata = {
  title: "Next.js with Supabase Auth",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await supabaseServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const accessToken = session?.access_token || null;
  const theme = await getCurrentTheme();

  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${theme === "dark" ? "dark" : ""}`}
    >
      <body>
        <AuthProvider accessToken={accessToken}>
          <div className="flex min-h-screen flex-col items-center justify-between p-24">
            {children}
            <ThemeToggle />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
