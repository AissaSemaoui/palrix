import { MainNav } from "@/components/main-nav";
import { Button, buttonVariants } from "@/components/ui/button";
import { paths } from "@/config/navigations";
import Link from "next/link";

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
          <Link href={paths.auth.login} className={buttonVariants({ variant: "secondary" })}>
            Login
          </Link>

          <Link href={paths.auth.register} className={buttonVariants({ variant: "default" })}>
            Register
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}
