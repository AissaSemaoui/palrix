import React from "react";

import HistoryCard from "@/lib/palettes/components/HistoryCard";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PopoverContentProps } from "@radix-ui/react-popover";

type HistoryPopoverProps = React.PropsWithChildren<{
  side?: PopoverContentProps["side"];
}>;

const HistoryPopover = ({ side, children }: HistoryPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent asChild side={side}>
        <ScrollArea className="h-[600px] w-96 px-3">
          <HistoryCard className="sticky top-2 px-1" />
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default HistoryPopover;
