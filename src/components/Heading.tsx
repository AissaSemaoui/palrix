import React from "react";
import { cva } from "class-variance-authority";

type HeadingProps = {
  type?: 1 | 2 | 3 | 4 | 5 | 6;
  order?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  children?: React.ReactNode;
};

const Heading = ({ type, order, className, children }: HeadingProps) => {
  const Tag = `h${order ?? type ?? 1}` as keyof JSX.IntrinsicElements;

  const getHeadingClass = cva(`text-heading`, {
    variants: {
      type: {
        1: "text-2xl font-bold tracking-tight",
        2: "text-xl font-semibold tracking-tight",
        3: "text-lg font-medium tracking-tight",
        4: "text-base font-medium tracking-tight",
        5: "text-sm font-normal tracking-tight",
        6: "text-xs font-normal tracking-tight",
      },
    },
  });

  return <Tag className={getHeadingClass({ type, className })}>{children}</Tag>;
};

export default Heading;
