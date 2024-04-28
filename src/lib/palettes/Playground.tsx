"use client";

import React from "react";

import { Button } from "@/components/ui/Button";
import Tile from "@/components/ui/Tile";
import PaletteCard from "./PaletteCard";

import { cn } from "@/lib/utils";
import { useSelectedPalette } from "@/hooks/use-playground";
import Heading from "@/components/Heading";

type PlaygroundActionsProps = {
  className?: string;
};

type PlaygroundProps = {
  className?: string;
};

const PlaygroundActions = ({ className }: PlaygroundActionsProps) => {
  return (
    <Tile className={cn("space-x-2 border-none p-4", className)}>
      <Button variant="outline">Export</Button>
      <Button variant="outline">Save</Button>
    </Tile>
  );
};

const Playground = ({ className }: PlaygroundProps) => {
  const selectedPalette = useSelectedPalette();

  if (!selectedPalette) {
    return (
      <Tile className="text-center">
        <Heading type={2}>No Palette Selected yet!</Heading>
      </Tile>
    );
  }

  return (
    <section className={cn("", className)}>
      <PlaygroundActions className="mb-3" />

      <div className="space-y-2">
        {selectedPalette.colors.map((c) => (
          <PaletteCard key={c.name} name={c.name} shades={c.shades} primaryShade={selectedPalette.primaryShade} />
        ))}
      </div>
    </section>
  );
};

export default Playground;
