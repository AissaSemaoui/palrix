import React, { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

type ClickTooltipProps = React.PropsWithChildren<{
  content: string;
  disabled?: boolean;
}>;

const ClickableTooltip = ({ children, content, disabled = false }: ClickTooltipProps) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleOpenTooltip = () => {
    if (disabled) return;

    setTooltipOpen(true);
  };

  return (
    <TooltipProvider>
      <Tooltip open={tooltipOpen} onOpenChange={() => setTooltipOpen(false)}>
        <TooltipTrigger onClick={handleOpenTooltip} asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ClickableTooltip;
