"use client";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import Tile from "@/components/ui/tile";
import PaletteCard from "./PaletteCard";

import { Icons } from "@/components/Icons";
import { useSelectedPalette } from "@/hooks/use-playground";
import { cn } from "@/lib/utils";
import NewColorDialog from "./NewColorDialog";

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
    <section className={cn("space-y-8 rounded-md", className)}>
      <Heading type={2}>{selectedPalette.name}</Heading>

      <div className="space-y-6">
        {selectedPalette.colors.map((c) => (
          <PaletteCard key={c.name} {...c} primaryShade={selectedPalette.primaryShade} />
        ))}
      </div>

      <div>
        <NewColorDialog>
          <Button className="w-full">
            <Icons.plus className="mr-2 h-4 w-4" />
            Add New Color
          </Button>
        </NewColorDialog>
      </div>
    </section>
  );
};

export default Playground;
