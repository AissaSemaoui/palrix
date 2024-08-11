import React from "react";
import Image from "next/image";
import Link from "next/link";

import { paths } from "@/config/navigations";

const Logo = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <Link href={paths.dashboard.home} className={className}>
      <Image src="/assets/logo.png" className="h-10 w-fit" alt="palrix logo" width={700} height={200} />
    </Link>
  );
};

export default Logo;
