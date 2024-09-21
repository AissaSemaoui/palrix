"use client";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import Tile from "@/components/ui/tile";
import ExportDialog from "./ExportDialog";
import PaletteCard from "./PaletteCard";

import { useSelectedPalette } from "@/hooks/use-playground";
import { cn } from "@/lib/utils";

type PlaygroundActionsProps = {
  selectedPalette: NonNullable<ReturnType<typeof useSelectedPalette>>;
  className?: string;
};

type PlaygroundProps = {
  className?: string;
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
    <section className={cn("rounded-md", className)}>
      <Heading type={2} className="mb-4">
        {selectedPalette.name}
      </Heading>

      <div className="space-y-8 pb-2">
        {selectedPalette.colors.map((c) => (
          <PaletteCard key={c.name} {...c} primaryShade={selectedPalette.primaryShade} />
        ))}
      </div>
    </section>
  );
};

export default Playground;

const PlaygroundActions = ({ selectedPalette, className }: PlaygroundActionsProps) => {
  return <section className={className}></section>;
};
