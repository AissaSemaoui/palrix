"use client";

import React, { CSSProperties } from "react";
import { cva } from "class-variance-authority";

import Tile from "@/components/ui/Tile";
import chroma from "chroma-js";

interface ColorBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  color: CSSProperties["backgroundColor"];
}

const colorBoxVariants = cva("rounded-md border", {
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
});

const ColorBox = ({ color, size, className, ...props }: ColorBoxProps) => {
  const handleCopy = () => navigator.clipboard.writeText(color ?? "");

  console.log(color);

  return (
    <div className={className}>
      <Tile
        className={colorBoxVariants({ size, className })}
        {...props}
        shadow="sm"
        onClick={handleCopy}
        style={{
          backgroundColor: color,
        }}
      />

      <p className="text-sm text-muted-foreground">{color}</p>
    </div>
  );
};

export default ColorBox;
