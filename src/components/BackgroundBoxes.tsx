"use client";
import React from "react";
import { Boxes, BoxesCore } from "./ui/background-boxes";
import { cn } from "@/lib/utils";

type BackgroundBoxesProps = React.PropsWithChildren<{ className?: string }>;

function BackgroundBoxes({ children, className }: BackgroundBoxesProps) {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-muted",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 z-20 h-full w-full bg-background [mask-image:radial-gradient(transparent,white)]" />

      <Boxes className="opacity-70" />

      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}

export default BackgroundBoxes;
