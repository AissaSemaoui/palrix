"use client";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import Tile from "@/components/ui/tile";
import PaletteCard from "./PaletteCard";

import { useGetPalette } from "@/api-client/queries/useGetPalette";
import { Icons } from "@/components/Icons";
import { cn } from "@/lib/utils";
import EditPaletteNameDialog from "./EditPaletteNameDialog";
import NewColorDialog from "./NewColorDialog";

type PlaygroundProps = {
  className?: string;
};

const Playground = ({ className }: PlaygroundProps) => {
  const { data: selectedPalette } = useGetPalette();

  console.log("selectedPalette: ", selectedPalette);

  if (!selectedPalette) {
    return (
      <Tile className="text-center">
        <Heading type={2}>No Palette Selected yet!</Heading>
      </Tile>
    );
  }

  return (
    <section className={cn("rounded-md", className)}>
      <div className="mb-4 mt-8 py-2">
        <div className="flex w-fit items-center gap-4">
          <div className="flex items-center gap-1">
            <Heading type={2}>{selectedPalette.name}</Heading>

            <EditPaletteNameDialog defaultName={selectedPalette.name}>
              <Button variant="ghost" size="icon">
                <Icons.edit className="h-4 w-4" />
              </Button>
            </EditPaletteNameDialog>
          </div>

          <div className="space-x-2">
            <Button variant="outline" size="md">
              Save
            </Button>
            <Button variant="outline" size="md">
              Share
            </Button>
          </div>
        </div>

        <p className="text-sm font-normal text-light"> {selectedPalette.description}</p>
      </div>

      <div className="mb-8 space-y-6">
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
