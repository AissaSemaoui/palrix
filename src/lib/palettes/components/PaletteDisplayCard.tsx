"use client";

import Link from "next/link";

import ColorBox from "@/components/ColorBox";
import Heading from "@/components/Heading";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import Tile from "@/components/ui/tile";

import { cn } from "@/lib/utils";

import { paths } from "@/config/navigations";
import type { Palette } from "@/server/types";

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

  return (
    <Link href={paths.dashboard.playground(palette.id)}>
      <Tile
        size="md"
        className={cn(
          "cursor-pointer space-y-2 border-none p-2 transition-all duration-100 hover:ring hover:ring-accent",
          className,
        )}
        // onClick={handleSelectPalette}
      >
        <div className="flex items-center justify-between gap-2">
          <Heading type={5} className="capitalize">
            {name}
          </Heading>
          <Button variant="secondary" size="md">
            Select
            <Icons.arrowRight className="ml-1 h-3 w-3 text-secondary-foreground" />
          </Button>
        </div>

        <div className="flex w-full max-w-full justify-stretch gap-1 overflow-x-hidden">
          {formattedShades.map(({ shade, name }) => (
            <ColorBox key={name} color={shade} name={name} showCode={false} className="w-full" />
          ))}
        </div>
      </Tile>
    </Link>
  );
};

export default PaletteDisplayCard;
``;
