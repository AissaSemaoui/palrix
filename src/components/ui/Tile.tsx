import React from "react";

import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface Tile extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  shadow?: "sm" | "md" | "lg" | "none";
}

const tileVariants = cva("rounded-xl border bg-card text-card-foreground shadow", {
  variants: {
    size: {
      sm: "p-2",
      md: "p-4",
      lg: "p-6",
    },
    shadow: {
      none: "shadow-none",
      sm: "shadow-sm",
      md: "shadow",
      lg: "shadow-lg",
    },
  },
  defaultVariants: {
    size: "md",
    shadow: "none",
  },
});

const Tile = React.forwardRef<HTMLDivElement, Tile>(({ className, size, shadow, ...props }, ref) => {
  return <div ref={ref} className={cn(tileVariants({ size, shadow }), className)} {...props} />;
});

Tile.displayName = "Tile";

export default Tile;
