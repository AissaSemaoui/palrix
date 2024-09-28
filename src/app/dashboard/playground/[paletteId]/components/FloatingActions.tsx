"use client";

import { useState } from "react";

import { Icons } from "@/components/Icons";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import Tile from "@/components/ui/tile";
import ExportDialog from "@/lib/palettes/components/ExportDialog";
import PromptCard from "../../components/PromptCard";

import { useGetPalette } from "@/api-client/queries/useGetPalette";
import { cn } from "@/lib/utils";
import PaletteChatInput from "./PaletteChatInput";

type FloatingActionsProps = {
  className?: string;
};

const FloatingActions = ({ className }: FloatingActionsProps) => {
  const { data: selectedPalette } = useGetPalette();

  const [showPromptCard, setShowPromptCard] = useState(false);

  if (!selectedPalette) return;

  return (
    <div className={cn("w-full max-w-screen-md px-4", className)} id="floating-actions">
      {showPromptCard && <PaletteChatInput />}

      <Tile shadow="lg" className="flex items-center justify-between border-2 border-purple-600">
        <div className="flex items-center gap-2">
          <ModeToggle className="mr-2" />

          <ExportDialog colors={selectedPalette?.colors}>
            <Button variant="outline">Export</Button>
          </ExportDialog>
        </div>

        <Button size="lg" onClick={() => setShowPromptCard((prev) => !prev)}>
          Chat with your palette
          {showPromptCard ? (
            <Icons.chevronDown className="ml-2 h-4 w-4" />
          ) : (
            <Icons.chevronUp className="ml-2 h-4 w-4" />
          )}
        </Button>
      </Tile>
    </div>
  );
};

export default FloatingActions;
