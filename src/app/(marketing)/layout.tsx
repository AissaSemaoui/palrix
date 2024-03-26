import { MainNav } from "@/components/main-nav";
import { Button } from "@/components/ui/button";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex h-20 items-center justify-between border-b px-4 ">
        <MainNav items={[{ title: "Marketing", href: "/" }]} />

        <div className="flex gap-2">
          <Button variant="secondary">Login</Button>
          <Button variant="default">Register</Button>
        </div>
      </header>
      {children}
    </div>
  );
}
