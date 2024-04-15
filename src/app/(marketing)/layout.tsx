import { MainNav } from "@/components/main-nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-full min-h-screen flex-col">
      <header className="flex h-20 items-center justify-between border-b px-4 ">
        <MainNav items={[{ title: "Home", href: "/" }]} />
      </header>
      {children}
    </main>
  );
}
