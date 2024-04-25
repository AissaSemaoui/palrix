import React from "react";

import Heading from "@/components/Heading";
import Tile from "@/components/ui/Tile";
import ColorBox from "@/components/ColorBox";

type PaletteCardProps = {};

const PaletteCard = ({}: PaletteCardProps) => {
  return (
    <Tile size="md" className="space-y-4">
      <div className="flex items-end gap-2">
        <ColorBox color="white" size="lg" />
        <div>
          <Heading type={4}>Blue</Heading>
          <p className="text-sm text-muted-foreground shadow-red-500">#53434</p>
        </div>
      </div>
      <div className="flex justify-stretch gap-1">
        <ColorBox color="red" className="w-full" />
        <ColorBox color="red" className="w-full" />
        <ColorBox color="red" className="w-full" />
        <ColorBox color="red" className="w-full" />
        <ColorBox color="red" className="w-full" />
        <ColorBox color="red" className="w-full" />
        <ColorBox color="white" className="w-full" />
        <ColorBox color="white" className="w-full" />
        <ColorBox color="white" className="w-full" />
        <ColorBox color="white" className="w-full" />
      </div>
    </Tile>
  );
};

export default PaletteCard;
