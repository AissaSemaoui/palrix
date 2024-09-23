"use client";

import React, { useState } from "react";

import { Icons } from "@/components/Icons";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import Tile from "@/components/ui/tile";

import { cn } from "@/lib/utils";
import PromptCard from "./PromptCard";
import ExportDialog from "@/lib/palettes/components/ExportDialog";
import { useSelectedPalette } from "@/hooks/use-playground";

type FloatingActionsProps = {
  className?: string;
};

const FloatingActions = ({ className }: FloatingActionsProps) => {
  const selectedPalette = useSelectedPalette();

  const [showPromptCard, setShowPromptCard] = useState(false);

  if (!selectedPalette) return;

  return (
    <div className={cn("w-full max-w-screen-md px-4", className)} id="floating-actions">
      {showPromptCard && <PromptCard />}

      <Tile shadow="lg" className="flex items-center justify-between border-2 border-purple-600">
        <div className="flex items-center gap-2">
          <ModeToggle className="mr-2" />

          <Button variant="outline">Save</Button>
          <ExportDialog colors={selectedPalette?.colors}>
            <Button variant="outline">Export</Button>
          </ExportDialog>
        </div>

        <Button size="lg" onClick={() => setShowPromptCard((prev) => !prev)}>
          Generate New Palette
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
