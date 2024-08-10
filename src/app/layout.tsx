import type { Metadata } from "next";
import { QueryClientProvider } from "@tanstack/react-query";
import clsx from "clsx";
import { Inter } from "next/font/google";

import AuthProvider from "@/lib/providers/AuthProvider";
import ThemeProvider from "@/lib/providers/ThemeProvider";
import { queryClient } from "@/api-client";

import "./globals.css";
import { verifyNextSession, verifySession } from "@/server/middlewares/auth.middleware";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Palrix",
  description: "Color Palette AI Generator",
};

const getSession = async () => {
  try {
    return await verifyNextSession(cookies().toString());
  } catch {
    return null;
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let session = await getSession();

  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body className={clsx(inter.className, "flex min-h-screen flex-col")}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <AuthProvider initialSession={session}>{children}</AuthProvider>
          </ThemeProvider>
        </body>
      </html>
    </QueryClientProvider>
  );
}
