import React from "react";

import Heading from "@/components/Heading";
import Tile from "@/components/ui/Tile";
import ColorBox from "@/components/ColorBox";

import type { Palette } from "@/server/types";
import Image from "next/image";
import { generatePalettePreview } from "@/server/utils/colors";

type PaletteCardProps = Pick<Palette["colors"][number], "name" | "shades"> & Pick<Palette, "primaryShade">;

const PaletteCard = ({ name, shades, primaryShade }: PaletteCardProps) => {
  const primaryColor = shades[4];

  return (
    <Tile size="md" className="space-y-4">
      <div className="flex items-end gap-2">
        <ColorBox color={primaryColor} size="lg" />
        <div>
          <Heading type={4} className="capitalize">
            {name}
          </Heading>
          <Image src={generatePalettePreview(shades)} width={70} height={6} alt="palette preview" />
          <p className="text-sm uppercase text-muted-foreground shadow-red-500">{primaryColor}</p>
        </div>
      </div>

      <div className="flex justify-stretch gap-1">
        {shades.map((shade) => (
          <ColorBox key={shade} color={shade} className="w-full" />
        ))}
      </div>
    </Tile>
  );
};

export default PaletteCard;
