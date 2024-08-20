"use client";

import { cva } from "class-variance-authority";
import React, { CSSProperties } from "react";

import Tile from "@/components/ui/tile";
import ClickableTooltip from "@/components/ui/ClickableTooltip";
import If from "./If";

import { cn, copyToClipboard } from "@/lib/utils";

interface ColorBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  size?: "sm" | "md" | "lg";
  color: CSSProperties["backgroundColor"];
  readOnly?: boolean;
  showCode?: boolean;
  showName?: boolean;
}

const colorBoxVariants = cva(
  "rounded-md cursor-pointer dark:border-gray-900 border-gray-50 overflow-hidden shadow-none",
  {
    variants: {
      size: {
        sm: "h-8 min-w-8",
        md: "h-14 min-w-14",
        lg: "h-20 min-w-20",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const ColorBox = ({
  color,
  size,
  name,
  className,
  readOnly = false,
  showCode = true,
  showName = true,
  ...props
}: ColorBoxProps) => {
  const handleCopy = () => copyToClipboard(color);

  return (
    <div className={cn("w-fit", className)}>
      <ClickableTooltip content={`${color} copied!`} disabled={readOnly}>
        <Tile
          className={colorBoxVariants({ size, className })}
          {...props}
          shadow="sm"
          onClick={handleCopy}
          style={{
            backgroundColor: color,
          }}
        />
      </ClickableTooltip>
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
