"use client";

import { cva } from "class-variance-authority";
import React, { CSSProperties } from "react";

import Tile from "@/components/ui/Tile";
import If from "./If";
import { cn } from "@/lib/utils";

interface ColorBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  size?: "sm" | "md" | "lg";
  color: CSSProperties["backgroundColor"];
  showCode?: boolean;
  showName?: boolean;
}

const colorBoxVariants = cva(
  "rounded-md cursor-pointer dark:border-gray-900 border-gray-50 overflow-hidden shadow-none",
  {
    variants: {
      size: {
        sm: "h-8 w-8",
        md: "h-14 w-14",
        lg: "h-20 w-20",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const ColorBox = ({ color, size, name, className, showCode = true, showName = true, ...props }: ColorBoxProps) => {
  const handleCopy = () => navigator.clipboard.writeText(color ?? "");

  return (
    <div className={cn("overflow-x-hidden", className)}>
      <Tile
        className={colorBoxVariants({ size, className })}
        {...props}
        shadow="sm"
        onClick={handleCopy}
        style={{
          backgroundColor: color,
        }}
      />
      <If condition={showName}>
        <p className="mt-1 w-full max-w-full overflow-x-hidden text-ellipsis pl-1 text-xs font-medium capitalize text-muted-foreground">
          {name}
        </p>
      </If>
      <If condition={showCode}>
        <p className="pl-1 text-xs font-medium text-muted-foreground">{color}</p>
      </If>
    </div>
  );
};

export default ColorBox;
