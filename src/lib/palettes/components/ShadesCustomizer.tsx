import { CardContent } from "@/components/ui/card";
import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import Tile from "@/components/ui/tile";
import { Shade } from "@/server/types";

interface ColorSliderProps {
  label: string;
  value: number[];
  onChange: (value: [number, number]) => void;
}

type ShadesCustomizerProps = {
  shades: Shade[];
  onUpdateShades: (newShades: Shade[]) => void;
};

const ShadesCustomizer = ({ shades, onUpdateShades }: ShadesCustomizerProps) => {
  console.log(
    "hue: ",
    shades.map((sh) => sh[0]),
  );

  const shadesSaturation = shades.map((shade) => shade[1]);
  const shadesLightness = shades.map((shade) => shade[2]);

  console.log("default shadesSaturation: ", shadesSaturation);
  console.log("default shadesLightness: ", shadesLightness);

  function interpolateRange([start, end]: [number, number], steps: number): number[] {
    return Array.from({ length: steps }, (_, i) => {
      const value = start + (i / (steps - 1)) * (end - start);
      // Multiply by 100, round, then divide by 100 to get precise 2 decimal places
      // return value;
      return Math.floor(value * 100) / 100;
    });
  }

  const handleSaturationChange = ([startSaturation, endSaturation]: [number, number]) => {
    console.log("value : ", startSaturation, endSaturation);

    const saturationMap = interpolateRange([startSaturation / 100, endSaturation / 100], shades.length).reverse();

    console.log("saturationMap: ", saturationMap);

    const newShades = shades.map((shade, index) => {
      const [h, , l] = shade;
      const hue = isNaN(h) ? 0 : h;
      const lightness = isNaN(l) ? 0 : l;

      const newColor = [hue, saturationMap[index], lightness] as Shade;

      return newColor;
    });

    onUpdateShades(newShades);
  };

  const handleLightnessChange = ([startLightness, endLightness]: [number, number]) => {
    // const lightnessStep = (endLightness - startLightness) / 100 / shades.length;
    const lightnessMap = interpolateRange([startLightness / 100, endLightness / 100], shades.length).reverse();

    const newShades = shades.map((shade, index) => {
      const [h, s] = shade;
      const hue = isNaN(h) ? 0 : h;
      const saturation = isNaN(s) ? 0 : s;

      const newColor = [hue, saturation, lightnessMap[index]] as Shade;

      return newColor;
    });

    onUpdateShades(newShades);
  };

  return (
    <Tile className="-mt-2 rounded-lg bg-secondary pb-2 pt-8">
      <CardContent className="space-y-6">
        <FormItem className="flex items-center gap-2">
          <ColorSlider
            label="Saturation"
            value={[shadesSaturation[0] * 100, shadesSaturation.at(-1)! * 100].reverse()}
            onChange={handleSaturationChange}
          />
        </FormItem>
        <FormItem className="flex items-center gap-2">
          <ColorSlider
            label="Lightness"
            value={[shadesLightness[0] * 100, shadesLightness.at(-1)! * 100].reverse()}
            onChange={handleLightnessChange}
          />
        </FormItem>
      </CardContent>
    </Tile>
  );
};

function ColorSlider({ label, value, onChange }: ColorSliderProps) {
  const handleSliderChange = (newValue: number[]) => {
    onChange(newValue as [number, number]);
  };

  const handleInputChange = (index: 0 | 1, inputValue: string) => {
    const numValue = parseInt(inputValue, 10);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
      const newValue = [...value] as [number, number];
      newValue[index] = numValue;
      onChange(newValue.sort((a, b) => a - b) as [number, number]);
    }
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{label}</Label>
        <span className="text-xs text-muted-foreground">
          {value[0].toFixed()}% - {value[1].toFixed()}%
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          min={0}
          max={100}
          step={1}
          value={value[0].toFixed()}
          onChange={(e) => handleInputChange(0, e.target.value)}
          className="h-6 w-16 text-xs"
        />
        <Slider value={value} min={0} max={100} step={1} onValueChange={handleSliderChange} className="flex-1" />
        <Input
          type="number"
          min={0}
          max={100}
          step={1}
          value={value[1].toFixed()}
          onChange={(e) => handleInputChange(1, e.target.value)}
          className="h-6 w-16 text-xs"
        />
      </div>
    </div>
  );
}

export default ShadesCustomizer;
