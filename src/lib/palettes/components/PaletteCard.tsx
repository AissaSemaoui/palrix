"use client";

import Image from "next/image";

import ColorBox from "@/components/ColorBox";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import Tile from "@/components/ui/tile";
import ExportDialog from "./ExportDialog";

import { queryClient, queryKeys } from "@/api-client";
import { useUpdatePalette } from "@/api-client/mutations/useUpdatePalette";
import { Icons } from "@/components/Icons";
import { SHADES_NAMES } from "@/config/constants";
import { useThemeCustomizerActions } from "@/hooks/use-theme-config";
import { cn } from "@/lib/utils";
import type { Palette, Shade } from "@/server/types";
import { generatePalettePreview } from "@/server/utils/colors";
import { useState } from "react";
import toast from "react-hot-toast";
import EditColorNameDialog from "./EditColorNameDialog";
import ShadesCustomizer from "./ShadesCustomizer";
import UiExamplesDrawer from "./UiExamplesDrawer";
import { usePlayground } from "@/hooks/use-playground";

type PaletteCardProps = Palette["colors"][number] &
  Pick<Palette, "primaryShade"> & {
    paletteId: Palette["id"];
    index: number;
  };

const PaletteCard = ({ paletteId, index, name, shades, mainShade, explanation }: PaletteCardProps) => {
  const { mutate: updatePaletteAsync, isPending } = useUpdatePalette(paletteId, {
    onSuccess: () => {
      toast.success("Color Updated Successfully!");
      queryClient.invalidateQueries({ queryKey: queryKeys.getPalette(paletteId) });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const { updatePalette } = usePlayground();

  const { setThemeConfig } = useThemeCustomizerActions();
  const [showShadesCustomizer, setShowShadesCustomizer] = useState(false);
  const [customShades, setCustomShades] = useState(shades);

  const primaryColor = mainShade ?? shades?.[5] ?? shades?.[4];

  const formattedShades = customShades.map((sh, i) => ({
    shade: sh,
    name: SHADES_NAMES[i],
  }));

  const handleSelectTheme = () => {
    setThemeConfig({ theme: name });
  };

  const handleUpdateColorName = (colorName: string) => {
    updatePaletteAsync({
      colors: [
        {
          index,
          updates: {
            name: colorName,
          },
        },
      ],
    });
  };

  const handleUpdateShades = (newShades: Shade[]) => {
    setCustomShades(newShades);
    updatePalette({
      colors: [
        {
          index,
          updates: {
            shades: newShades,
          },
        },
      ],
    });
  };

  return (
    <article className="border-none">
      <div className="mb-3 flex items-end gap-2 px-2">
        <div>
          <div className="flex items-center gap-1">
            <Heading type={3} className="capitalize">
              {name}
            </Heading>

            <EditColorNameDialog defaultName={name} onSubmit={handleUpdateColorName} isLoading={isPending}>
              <Button variant="ghost" size="icon-sm">
                <Icons.edit className="h-3 w-3" />
              </Button>
            </EditColorNameDialog>
          </div>

          <Image src={generatePalettePreview(shades)} width={70} height={6} alt="palette preview" className="mb-1" />

          <p className="text-xs text-muted-foreground">{explanation}</p>
        </div>
        <div className="ml-auto flex gap-2">
          <UiExamplesDrawer>
            <Button variant="link" size="sm" onClick={handleSelectTheme}>
              Toggle UI
            </Button>
          </UiExamplesDrawer>

          <ExportDialog colors={{ name, shades, mainShade, explanation }}>
            <Button variant="link" size="sm">
              Export
            </Button>
          </ExportDialog>
        </div>
      </div>

      <Tile size="md" className="relative rounded-lg shadow-none">
        <div className="mb-2 grid grid-cols-12 gap-1 md:grid-cols-11">
          {formattedShades.map(({ shade, name }) => (
            <ColorBox key={name} color={shade} name={name} className="col-span-4 w-full sm:col-span-2 md:col-span-1" />
          ))}
        </div>
        <div className="flex justify-end">
          <Button
            size="icon-sm"
            variant="outline"
            className={cn("h-6 w-6 rounded-full transition-all", showShadesCustomizer && "-rotate-90")}
            onClick={() => setShowShadesCustomizer((prev) => !prev)}
          >
            <Icons.chevronLeft className="h-4 w-4" />
          </Button>
        </div>
      </Tile>

      {showShadesCustomizer && <ShadesCustomizer shades={customShades} onUpdateShades={handleUpdateShades} />}
    </article>
  );
};

export default PaletteCard;
