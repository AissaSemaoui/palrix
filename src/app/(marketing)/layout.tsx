import { MainNav } from "@/components/MainNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between border-b px-4 py-3 ">
        <MainNav items={[{ title: "Home", href: "/" }]} />
      </header>
      {children}
    </main>
  );
}
