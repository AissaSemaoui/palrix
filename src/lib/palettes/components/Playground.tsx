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
    <Tile className={cn("space-x-2 rounded-sm p-2 shadow-sm", className)}>
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
    <section className={cn("rounded-md bg-muted", className)}>
      <PlaygroundActions className="mb-2" />

      <div className="px-4">
        <Heading type={4}>{selectedPalette.name}</Heading>
      </div>

      <div className="space-y-2 p-2">
        {selectedPalette.colors.map((c) => (
          <PaletteCard key={c.name} {...c} primaryShade={selectedPalette.primaryShade} />
        ))}
      </div>
    </section>
  );
};

export default Playground;
