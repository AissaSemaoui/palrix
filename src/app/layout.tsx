import type { Metadata } from "next";
import { QueryClientProvider } from "@tanstack/react-query";
import clsx from "clsx";
import { Inter } from "next/font/google";

import AuthProvider from "@/lib/providers/AuthProvider";
import ThemeProvider from "@/lib/providers/ThemeProvider";
import { queryClient } from "@/api-client";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Palrix",
  description: "Color Palette AI Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <body className={clsx(inter.className, "flex min-h-screen flex-col")}>
            <AuthProvider>{children}</AuthProvider>
          </body>
        </ThemeProvider>
      </html>
    </QueryClientProvider>
  );
}
