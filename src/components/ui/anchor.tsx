import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";

import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import Link from "next/link";

export interface AnchorProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href: string;
}

const Anchor = React.forwardRef<HTMLAnchorElement, AnchorProps>(
  ({ className, variant, size, asChild = false, href, ...props }, ref) => {
    const Comp = asChild ? Slot : Link;
    return <Comp href={href} className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Anchor.displayName = "Anchor";

export { Anchor };
