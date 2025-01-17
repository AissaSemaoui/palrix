import chroma, { Color } from "chroma-js";
import { Shade } from "../types";
import { formatColor } from "@/lib/utils";

// Types and Interfaces
type ColorSpace = "hsl" | "rgb" | "lab";
type InterpolationMethod = "linear" | "bezier";

interface ColorPaletteConfig {
  lightnessRange: [number, number];
  saturationRange: [number, number];
  numShades: number;
  colorSpace: ColorSpace;
  interpolationMethod: InterpolationMethod;
}

interface NamedPalette {
  name: string;
  config: Partial<ColorPaletteConfig>;
}

// Default configuration
const defaultConfig: ColorPaletteConfig = {
  lightnessRange: [0.1, 0.9],
  saturationRange: [0.1, 0.9],
  numShades: 9,
  colorSpace: "hsl",
  interpolationMethod: "linear",
};

// Named palette configurations
const namedPalettes: NamedPalette[] = [
  { name: "pastel", config: { lightnessRange: [0.7, 0.9], saturationRange: [0.1, 0.3] } },
  { name: "vibrant", config: { lightnessRange: [0.3, 0.7], saturationRange: [0.7, 0.9] } },
  { name: "muted", config: { lightnessRange: [0.3, 0.7], saturationRange: [0.2, 0.4] } },
];

// Memoization function
function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map();
  return ((...args: any[]) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

// Color palette generation
// Update the generateColorPalette function to pass colorSpace to interpolateRange
export function generateColorPalette(
  primaryColor: string,
  config: Partial<ColorPaletteConfig> = {},
): { shades: Shade[] } {
  const fullConfig = { ...defaultConfig, ...config };
  const { lightnessRange, saturationRange, numShades, colorSpace, interpolationMethod } = fullConfig;

  if (!chroma.valid(primaryColor)) {
    throw new Error(`Invalid primary color: ${primaryColor}`);
  }

  const primaryColorObj = chroma(primaryColor);
  const baseHue = primaryColorObj.get(`${colorSpace}.h`);

  const lightnessMap = interpolateRange(lightnessRange, numShades, interpolationMethod, colorSpace);
  const saturationMap = interpolateRange(saturationRange, numShades, interpolationMethod, colorSpace);

  const shades = lightnessMap.map(
    (l, i) =>
      chroma[colorSpace](baseHue, saturationMap[i], l)
        .hsl()
        .slice(0, 3)
        .map((v) => Number(v.toFixed(2))) as Shade,
  );

  console.log("shades: ", shades);

  return { shades };
}

function interpolateRange(
  [start, end]: [number, number],
  steps: number,
  method: InterpolationMethod,
  colorSpace: ColorSpace,
): number[] {
  if (method === "linear") {
    return Array.from({ length: steps }, (_, i) => start + (i / (steps - 1)) * (end - start));
  } else if (method === "bezier") {
    // Create two colors using the start and end values in the specified color space
    const startColor = chroma[colorSpace](0, 0, start);
    const endColor = chroma[colorSpace](0, 0, end);

    // Create a bezier interpolator between these colors
    const bezier = chroma.bezier([startColor.name(), endColor.name()]);

    // Use the bezier function to interpolate and extract the relevant channel
    return Array.from({ length: steps }, (_, i) => {
      const t = i / (steps - 1);
      return bezier(t).get(`${colorSpace}.${colorSpace === "hsl" ? "l" : colorSpace === "rgb" ? "r" : "l"}`);
    });
  }
  throw new Error(`Unsupported interpolation method: ${method}`);
}

// Memoized helper functions
export const getClosestLightness = memoize((colorObject: Color, lightnessMap: number[]): number =>
  lightnessMap.reduce((prev, curr) =>
    Math.abs(colorObject.get("hsl.l") - curr) < Math.abs(colorObject.get("hsl.l") - prev) ? curr : prev,
  ),
);

export const getClosestSaturation = memoize((colorObject: Color, saturationMap: number[]): number =>
  saturationMap.reduce((prev, curr) =>
    Math.abs(colorObject.get("hsl.s") - curr) < Math.abs(colorObject.get("hsl.s") - prev) ? curr : prev,
  ),
);

// Accessibility functions
export function getColorContrast(color1: string, color2: string): number {
  return chroma.contrast(color1, color2);
}

export function isAccessible(foreground: string, background: string, level: "AA" | "AAA" = "AA"): boolean {
  const contrast = getColorContrast(foreground, background);
  return level === "AA" ? contrast >= 4.5 : contrast >= 7;
}

// Color harmony functions
export function getComplementaryColor(color: string): string {
  return chroma(color)
    .set("hsl.h", (chroma(color).get("hsl.h") + 180) % 360)
    .hex();
}

export function getAnalogousColors(color: string): [string, string] {
  const baseHue = chroma(color).get("hsl.h");
  return [
    chroma(color)
      .set("hsl.h", (baseHue + 30) % 360)
      .hex(),
    chroma(color)
      .set("hsl.h", (baseHue - 30 + 360) % 360)
      .hex(),
  ];
}

// Named palette function
export function getNamedPalette(name: string, primaryColor: string): { shades: Shade[] } {
  const palette = namedPalettes.find((p) => p.name.toLowerCase() === name.toLowerCase());
  if (!palette) {
    throw new Error(`Named palette not found: ${name}`);
  }
  return generateColorPalette(primaryColor, palette.config);
}

// Palette preview function
export function generatePalettePreview(palette: Shade[]): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="100%">
      ${palette
        .map(
          (color, i) => `
        <rect x="${i * 30}" y="0" width="30" height="50" fill="${formatColor(color)}" />
      `,
        )
        .join("")}
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}
