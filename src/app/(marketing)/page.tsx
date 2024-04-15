"use client";

import { useUserMe } from "@/hooks/use-user";

export default function Home() {
  const userMe = useUserMe();

  return (
    <main className="h-full w-full flex-1">
      <h1 className="py-20 text-center text-4xl">Hello from Palrix</h1>
      <h2 className="text-2xl text-purple-500">{userMe?.id}</h2>
    </main>
  );
}
