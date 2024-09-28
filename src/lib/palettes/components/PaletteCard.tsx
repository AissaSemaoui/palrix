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
import { useThemeCustomizerActions } from "@/hooks/use-theme-config";
import { Icons } from "@/components/Icons";
import EditColorNameDialog from "./EditColorNameDialog";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { FormItem } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { CardContent } from "@/components/ui/card";

type PaletteCardProps = Pick<Palette["colors"][number], "name" | "shades" | "mainShade"> &
  Pick<Palette, "primaryShade">;

const PaletteCard = ({ name, shades, mainShade }: PaletteCardProps) => {
  const { setThemeConfig } = useThemeCustomizerActions();
  const [showShadeCustomizer, setShowShadeCustomizer] = useState(false);

  const primaryColor = mainShade ?? shades?.[5] ?? shades?.[4];

  const formattedShades = shades.map((sh, i) => ({
    shade: sh,
    name: SHADES_NAMES[i],
  }));

  const handleSelectTheme = () => {
    setThemeConfig({ theme: name });
  };

  return (
    <article className="border-none">
      <div className="mb-3 flex items-end gap-2 px-2">
        <div>
          <div className="flex items-center gap-1">
            <Heading type={3} className="capitalize">
              {name}
            </Heading>

            <EditColorNameDialog defaultName={name}>
              <Button variant="ghost" size="icon-sm">
                <Icons.edit className="h-3 w-3" />
              </Button>
            </EditColorNameDialog>
          </div>

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

      <Tile size="md" className="relative rounded-lg shadow-none">
        <div className="mb-2 grid grid-cols-12 gap-1 md:grid-cols-11">
          {formattedShades.map(({ shade, name }) => (
            <ColorBox key={shade} color={shade} name={name} className="col-span-4 w-full sm:col-span-2 md:col-span-1" />
          ))}
        </div>
        <div className="flex justify-end">
          <Button
            size="icon-sm"
            variant="outline"
            className={cn("h-6 w-6 rounded-full transition-all", showShadeCustomizer && "-rotate-90")}
            onClick={() => setShowShadeCustomizer((prev) => !prev)}
          >
            <Icons.chevronLeft className="h-4 w-4" />
          </Button>
        </div>
      </Tile>

      {showShadeCustomizer && (
        <Tile className="-mt-2 rounded-lg bg-secondary pb-2 pt-8">
          <CardContent className="space-y-6">
            <FormItem className="flex items-center gap-2">
              <Label>Saturation</Label>
              <Slider step={1} />
            </FormItem>
            <FormItem className="flex items-center gap-2">
              <Label>Lightness</Label>
              <Slider step={1} />
            </FormItem>
          </CardContent>
        </Tile>
      )}
    </article>
  );
};

export default PaletteCard;
