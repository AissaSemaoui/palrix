"use client";

import ColorBox from "@/components/ColorBox";
import Heading from "@/components/Heading";
import Tile from "@/components/ui/Tile";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/Button";
import { usePlaygroundActions } from "@/hooks/use-playground";
import type { Palette } from "@/server/types";
import { cn } from "../../utils";

type PaletteCardProps = Palette & {
  className?: string;
};

const PaletteDisplayCard = ({ className, ...palette }: PaletteCardProps) => {
  const { name, colors, primaryShade } = palette;
  console.log(colors, primaryShade);

  const formattedShades = colors.slice(0, 3).map((color, i) => ({
    shade: color.mainShade ?? color.shades?.[4] ?? color.shades?.[2] ?? color.shades?.[1] ?? color.shades?.[0],
    name: color.name,
  }));

  const { setSelectedPalette } = usePlaygroundActions();

  const handleSelectPalette = () => {
    setSelectedPalette(palette);
  };

  return (
    <Tile size="md" className={cn("space-y-2 border-none p-2", className)}>
      <div className="flex items-center justify-between gap-2">
        <Heading type={5} className="capitalize">
          {name}
        </Heading>
        <Button variant="secondary" size="sm" onClick={handleSelectPalette}>
          Select
          <Icons.arrowRight className="ml-1 h-3 w-3 text-secondary-foreground" />
        </Button>
      </div>

      <div className="flex w-full max-w-full justify-stretch gap-1 overflow-x-hidden">
        {formattedShades.map(({ shade, name }) => (
          <ColorBox key={shade} color={shade} name={name} showCode={false} className="w-full" />
        ))}
      </div>
    </Tile>
  );
};

export default PaletteDisplayCard;
``;
