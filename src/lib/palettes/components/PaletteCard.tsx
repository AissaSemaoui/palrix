import Image from "next/image";

import ColorBox from "@/components/ColorBox";
import Heading from "@/components/Heading";
import Tile from "@/components/ui/Tile";
import { Button } from "@/components/ui/Button";
import ExportDialog from "./ExportDialog";

import { SHADES_NAMES } from "@/config/constants";
import type { Palette } from "@/server/types";
import { generatePalettePreview } from "@/server/utils/colors";

type PaletteCardProps = Pick<Palette["colors"][number], "name" | "shades" | "mainShade"> &
  Pick<Palette, "primaryShade">;

const PaletteCard = ({ name, shades, mainShade }: PaletteCardProps) => {
  const primaryColor = mainShade ?? shades?.[5] ?? shades?.[4];

  const formattedShades = shades.map((sh, i) => ({
    shade: sh,
    name: SHADES_NAMES[i],
  }));

  return (
    <Tile size="md" className="space-y-4 border-none p-3">
      <div className="flex items-end gap-2">
        <ColorBox color={primaryColor} size="lg" showCode={false} />
        <div className="mb-1">
          <Heading type={4} className="capitalize">
            {name}
          </Heading>
          <Image src={generatePalettePreview(shades)} width={70} height={6} alt="palette preview" />
        </div>
        <div className="ml-auto flex gap-2">
          <Button variant="link" size="sm">
            Toggle UI
            {/* <Icons.copy className="ml-2 size-3" /> */}
          </Button>

          <ExportDialog colors={{ name, shades, mainShade }}>
            <Button variant="link" size="sm">
              Export
              {/* <Icons.heart className="ml-2 size-3" /> */}
            </Button>
          </ExportDialog>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-1 md:grid-cols-11">
        {formattedShades.map(({ shade, name }) => (
          <ColorBox key={shade} color={shade} name={name} className="col-span-4 w-full sm:col-span-2 md:col-span-1" />
        ))}
      </div>
    </Tile>
  );
};

export default PaletteCard;
