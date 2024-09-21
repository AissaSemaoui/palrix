"use client";

import Image from "next/image";

import ColorBox from "@/components/ColorBox";
import Heading from "@/components/Heading";
import Tile from "@/components/ui/tile";
import { Button } from "@/components/ui/button";
import ExportDialog from "./ExportDialog";

import { SHADES_NAMES } from "@/config/constants";
import type { Palette } from "@/server/types";
import { generatePalettePreview } from "@/server/utils/colors";
import UiExamplesDrawer from "./UiExamplesDrawer";
import { useThemeCustomizerActions } from "@/lib/examples/use-theme-config";

type PaletteCardProps = Pick<Palette["colors"][number], "name" | "shades" | "mainShade"> &
  Pick<Palette, "primaryShade">;

const PaletteCard = ({ name, shades, mainShade }: PaletteCardProps) => {
  const { setThemeConfig } = useThemeCustomizerActions();

  const primaryColor = mainShade ?? shades?.[5] ?? shades?.[4];

  const formattedShades = shades.map((sh, i) => ({
    shade: sh,
    name: SHADES_NAMES[i],
  }));

  const handleSelectTheme = () => {
    setThemeConfig({ theme: name });
  };

  return (
    <article className="space-y-3 border-none">
      <div className="flex items-end gap-2 px-2">
        <div>
          <Heading type={3} className="capitalize">
            {name}
          </Heading>
          <Image src={generatePalettePreview(shades)} width={70} height={6} alt="palette preview" />
        </div>
        <div className="ml-auto flex gap-2">
          <UiExamplesDrawer>
            <Button variant="link" size="sm" onClick={handleSelectTheme}>
              Toggle UI
            </Button>
          </UiExamplesDrawer>

          <ExportDialog colors={{ name, shades, mainShade }}>
            <Button variant="link" size="sm">
              Export
            </Button>
          </ExportDialog>
        </div>
      </div>

      <Tile size="md" className="grid grid-cols-12 gap-1 rounded-lg shadow-sm md:grid-cols-11">
        {formattedShades.map(({ shade, name }) => (
          <ColorBox key={shade} color={shade} name={name} className="col-span-4 w-full sm:col-span-2 md:col-span-1" />
        ))}
      </Tile>
    </article>
  );
};

export default PaletteCard;
