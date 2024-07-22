import chroma, { type Color } from "chroma-js";

export const getClosestLightness = (colorObject: Color, LIGHTNESS_MAP: number[]) =>
  LIGHTNESS_MAP.reduce((prev, curr) => (colorObject.get("hsl.l") - curr > prev ? prev : curr), 0);

export const getClosestSaturation = (colorObject: Color, SATURATION_MAP: number[]) =>
  SATURATION_MAP.reduce((prev, curr) => (colorObject.get("hsl.l") - curr > prev ? prev : curr), 0);

export const inspiringGenerateColors = (primaryColor: string, LIGHTNESS_MAP: number[], SATURATION_MAP: number[]) => {
  const primaryColorObj = chroma(primaryColor);

  const lightness = primaryColorObj.get("hsl.l");
  const closestLightness = getClosestLightness(primaryColorObj, LIGHTNESS_MAP);
  const closestSaturation = getClosestSaturation(primaryColorObj, SATURATION_MAP);

  const primaryColorIndex = LIGHTNESS_MAP.findIndex((l) => l === closestLightness);
  const baseSaturation = closestSaturation;
  console.log(baseSaturation);

  console.log(baseSaturation, lightness);

  const shades = LIGHTNESS_MAP.map((l) => primaryColorObj.set("hsl.l", l)).map((c, i) => {
    return true ? c.saturate(baseSaturation + SATURATION_MAP[i]) : c;
  });

  console.log(shades);

  return shades;
};

export const generateShades = (
  primaryColor: string,
  numShades: number,
  lightnessRange: [number, number],
  saturationRange: [number, number],
) => {
  const primaryColorObj = chroma(primaryColor);
  const baseHue = primaryColorObj.get("hsl.h");

  console.log(lightnessRange, numShades);
  // Generate dynamic lightness and saturation maps
  const lightnessMap = Array.from(
    { length: numShades },
    (_, i) => lightnessRange[0] + (i / (numShades - 1)) * (lightnessRange[1] - lightnessRange[0]),
  );
  const saturationMap = Array.from(
    { length: numShades },
    (_, i) => saturationRange[0] + (i / (numShades - 1)) * (saturationRange[1] - saturationRange[0]),
  );

  const shades = lightnessMap.map((l, i) => {
    const saturation = saturationMap[i];
    return chroma(baseHue, saturation, l, "hsl").hex();
  });

  return shades;
};

export const extractLSMap = (shades: string[]) => {
  const lightnessMap: number[][] = [];
  const saturationMap: number[][] = [];

  const shadesObj = shades.map((c) => chroma(c));

  shadesObj.forEach((c, cI) => {
    const lightnessArr = (lightnessMap[cI] = [] as number[]);
    const saturationArr = (saturationMap[cI] = [] as number[]);
    const baseColor = chroma(shades[cI]);

    shadesObj.forEach((s) => {
      console.log(s.get("hsl.l"), baseColor.get("hsl.l"));
      lightnessArr.push(Number(s.get("hsl.l").toFixed(2)));
      saturationArr.push(Number((s.get("hsl.s") - baseColor.get("hsl.s")).toFixed(2)));
    });
  });

  return {
    lightnessMap,
    saturationMap,
  };
};
