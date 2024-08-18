"use client";

import { Button } from "@/components/ui/Button";
import Tile from "@/components/ui/Tile";
import Heading from "@/components/Heading";
import PaletteCard from "./PaletteCard";
import ExportDialog from "./ExportDialog";

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
    <section className={cn("rounded-md bg-muted", className)}>
      <PlaygroundActions selectedPalette={selectedPalette} className="mb-4" />

      <div className="space-y-2 px-2">
        {selectedPalette.colors.map((c) => (
          <PaletteCard key={c.name} {...c} primaryShade={selectedPalette.primaryShade} />
        ))}
      </div>
    </section>
  );
};

export default Playground;

const PlaygroundActions = ({ selectedPalette, className }: PlaygroundActionsProps) => {
  return (
    <Tile className={cn("flex items-center justify-between rounded-sm px-4 py-2 shadow-sm", className)}>
      <div>
        <Heading type={4}>{selectedPalette.name}</Heading>
      </div>

      <div className="space-x-2">
        <Button variant="outline">Save</Button>
        <ExportDialog colors={selectedPalette.colors}>
          <Button variant="outline">Export</Button>
        </ExportDialog>
      </div>
    </Tile>
  );
};
