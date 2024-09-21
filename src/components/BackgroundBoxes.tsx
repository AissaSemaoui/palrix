"use client";
import React from "react";
import { Boxes, BoxesCore } from "./ui/background-boxes";
import { cn } from "@/lib/utils";

type BackgroundBoxesProps = React.PropsWithChildren<{ className?: string }>;

function BackgroundBoxes({ children, className }: BackgroundBoxesProps) {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-slate-50",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 z-20 h-full w-full bg-slate-50 [mask-image:radial-gradient(transparent,white)]" />

      <Boxes />

      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default BackgroundBoxes;
