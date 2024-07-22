import React from "react";
import Image from "next/image";

const Logo = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={className}>
      <Image src="/assets/logo.png" className="h-10 w-fit" alt="palrix logo" width={700} height={200} />
    </div>
  );
};

export default Logo;
