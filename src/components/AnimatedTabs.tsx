"use client";

import React, { useState } from "react";

import TransitionPanel from "@/components/ui/TransitionPanel";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

type SingleItem = { title: string };

type AnimatedTabsProps<T extends SingleItem> = {
  items: T[];
  children: (item: T) => React.ReactNode;
  className?: string;
};

const AnimatedTabs = <T extends SingleItem>({ items, className, children }: AnimatedTabsProps<T>) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={cn("flex w-full flex-col gap-x-4 sm:flex-row", className)}>
      <div className="mb-4 flex gap-2 sm:flex-col">
        {items.map((item, index) => (
          <Button
            variant="outline"
            size="md"
            key={index}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "hover:bg-zinc-200 hover:text-zinc-800",
              activeIndex === index
                ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                : "bg-zinc-100 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-400",
            )}
          >
            {item.title}
          </Button>
        ))}
      </div>
      <div className="w-full">
        <TransitionPanel
          activeIndex={activeIndex}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          variants={{
            enter: { opacity: 0, y: -50, filter: "blur(4px)" },
            center: { opacity: 1, y: 0, filter: "blur(0px)" },
            exit: { opacity: 0, y: 50, filter: "blur(4px)" },
          }}
        >
          {items.map((item) => children(item))}
        </TransitionPanel>
      </div>
    </div>
  );
};
export default AnimatedTabs;
