import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CSS_VARS_NAMES, DEFAULT_THEME, MAPPER_THEME, SHADES_NAMES } from "@/config/constants";
import { usePlayground } from "@/hooks/use-playground";
import { useThemeCustomizer, useThemeCustomizerActions } from "@/hooks/use-theme-config";
import { Popover, PopoverContent, PopoverTrigger } from "@/lib/examples/components/ui/popover";
import { formatColor } from "@/lib/utils";
import { Palette } from "@/server/types";
import { ThemeMappingItem, ThemeMode, ThemeVariables } from "@/types";
import React from "react";

type ThemeMapperProps = React.PropsWithChildren;

type ColorDropdownProps = {
  colors: Palette["colors"];
  className?: string;
  onChangeShade: ({ paletteIndex, shadeIndex }: ThemeMappingItem) => void;
  selectedShade: ThemeMappingItem;
  mappingItem: ThemeMappingItem;
  cssVar: keyof ThemeVariables;
  themeMode: ThemeMode;
};

const ThemeMapper = ({ children }: ThemeMapperProps) => {
  const { updateThemeMapping, setThemeConfig } = useThemeCustomizerActions();
  const themeMapping = useThemeCustomizer((state) => state.themeMapping);

  const { currentPalette: selectedPalette } = usePlayground();

  if (!selectedPalette) return;

  const handleMappingShade = (cssVar: keyof ThemeVariables, colorIndex: number, shadeIndex: number) => {
    console.log(cssVar, colorIndex, shadeIndex, "changed shade");

    updateThemeMapping(
      cssVar,
      {
        paletteIndex: colorIndex,
        shadeIndex: shadeIndex,
      },
      "light",
    );
  };

  const handleApplyMapperTheme = () => {
    setThemeConfig({ theme: MAPPER_THEME });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>

      <PopoverContent side="right" asChild>
        <div className="w-full px-0 py-0">
          <ScrollArea className="h-80 w-96 p-4 pb-0">
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Dimensions</h4>
                <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
              </div>
              <div className="grid gap-2">
                {CSS_VARS_NAMES.map((cssVar) => {
                  const { paletteIndex, shadeIndex } = themeMapping.light[cssVar];

                  return (
                    <div key={cssVar} className="grid grid-cols-5 items-center gap-4">
                      <Label htmlFor="width" className="col-span-2 capitalize">
                        {cssVar.replaceAll("-", " ")}
                      </Label>
                      <ColorDropdown
                        colors={selectedPalette.colors}
                        onChangeShade={({ paletteIndex, shadeIndex }) =>
                          handleMappingShade(cssVar, paletteIndex, shadeIndex)
                        }
                        selectedShade={{ paletteIndex, shadeIndex }}
                        mappingItem={{ paletteIndex, shadeIndex }}
                        cssVar={cssVar}
                        themeMode="light"
                        className="col-span-3"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollArea>
          <div className="w-full p-4">
            <Button onClick={handleApplyMapperTheme} className="ml-auto block">
              Apply Mapper Theme
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeMapper;

const ColorDropdown = ({
  colors,
  selectedShade,
  onChangeShade,
  mappingItem,
  cssVar,
  themeMode,
  className,
}: ColorDropdownProps) => {
  const { paletteIndex, shadeIndex } = mappingItem;
  const selectedColor = colors[paletteIndex];

  return (
    <DropdownMenu modal>
      <DropdownMenuTrigger className={className}>
        <Button variant="secondary" className="w-full">
          <span
            className="mr-2 h-3 w-3 rounded-full"
            style={{
              background:
                formatColor(selectedColor?.shades[shadeIndex]) ?? `hsl(${DEFAULT_THEME.cssVars[themeMode][cssVar]})`,
            }}
          />
          {selectedColor ? `${selectedColor.name}-${SHADES_NAMES[shadeIndex]}` : `-`}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {colors.map((color, colorIdx) => (
          <DropdownMenuSub key={color.name}>
            <DropdownMenuSubTrigger className="capitalize">
              <span className="mr-2 h-3 w-3 rounded-full" style={{ background: formatColor(color.mainShade) }} />
              {color.name}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={String(selectedShade.shadeIndex)}
                onValueChange={(shadeIdx) => onChangeShade({ paletteIndex: colorIdx, shadeIndex: Number(shadeIdx) })}
              >
                {color.shades.map((shade, idx) => (
                  <DropdownMenuRadioItem
                    key={idx}
                    className="DropdownMenuRadioItem"
                    value={String(idx)}
                    onSelect={(e) => e.preventDefault()}
                  >
                    <span className="mr-2 h-3 w-3 rounded-full" style={{ background: formatColor(shade) }} />
                    {SHADES_NAMES[idx]}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
