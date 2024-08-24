import chroma, { type ColorSpaces } from "chroma-js";

import { SHADES_NAMES } from "@/config/constants";
import type { Palette, ExportFormat, ColorSpace } from "@/server/types";

type ColorInput = Palette["colors"][number] | Palette["colors"];

export const generateColorExport = (
  color: ColorInput,
  format: ExportFormat,
  colorSpace: ColorSpace,
  fullFormat: boolean,
): string => {
  if (Array.isArray(color)) {
    const formattedColors = color.map((c) => ({ ...c, shades: formatColor(c.shades, colorSpace, fullFormat) }));
    return wrapMultipleColors(
      formattedColors.map((c) => generateSingleColorExport(c, format)),
      format,
    );
  } else {
    const formattedColor = { ...color, shades: formatColor(color.shades, colorSpace, fullFormat) };
    return generateSingleColorExport(formattedColor, format);
  }
};

const formatColor = (c: string[], colorSpace: ColorSpace, fullFormat: boolean) =>
  c.map((shade) => {
    const result = chroma(shade)[colorSpace]();

    const formattedColor = getStringFormatBySpace(result, colorSpace, fullFormat);

    return formattedColor as string;
  });

const getStringFormatBySpace = <T extends ColorSpace>(
  color: ColorSpaces[T],
  colorSpace: T,
  fullFormat: boolean,
): string => {
  let formatted: string;

  switch (colorSpace) {
    case "hex": {
      const c = color as string;
      return fullFormat ? c : c.replace("#", "");
    }
    case "rgb":
    case "rgba": {
      const [r, g, b, a] = color as [number, number, number, number?];
      formatted =
        colorSpace === "rgba"
          ? `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a?.toFixed(2) ?? 1})`
          : `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
      break;
    }
    case "hsl": {
      const [h, s, l] = color as [number, number, number];
      formatted = `hsl(${Math.round(h)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%)`;
      break;
    }
    case "hsv":
    case "hsi": {
      // HSV and HSI are not directly supported in CSS, so we'll keep the previous format
      const [h, s, v] = color as [number, number, number];
      formatted = `${colorSpace}(${Math.round(h)}, ${(s * 100).toFixed(1)}%, ${(v * 100).toFixed(1)}%)`;
      break;
    }
    case "lab": {
      const [l, a, b] = color as [number, number, number];
      formatted = `lab(${l.toFixed(1)}% ${a.toFixed(1)} ${b.toFixed(1)})`;
      break;
    }
    case "oklab": {
      const [l, a, b] = color as [number, number, number];
      formatted = `oklab(${l.toFixed(3)} ${a.toFixed(3)} ${b.toFixed(3)})`;
      break;
    }
    case "lch": {
      const [l, c, h] = color as [number, number, number];
      formatted = `lch(${l.toFixed(1)}% ${c.toFixed(1)} ${h.toFixed(1)})`;
      break;
    }
    case "oklch": {
      const [l, c, h] = color as [number, number, number];
      formatted = `oklch(${l.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(1)})`;
      break;
    }
    case "hcl":
    case "cmyk":
    case "gl": {
      // These are not standard CSS color formats, so we'll keep the previous format
      const values = color as number[];
      formatted = `${colorSpace}(${values.map((v) => v.toFixed(2)).join(", ")})`;
      break;
    }
    default:
      throw new Error(`Unsupported color space: ${colorSpace}`);
  }

  return fullFormat ? formatted : formatted.split("(")[1].split(")")[0];
};

export const generateSingleColorExport = (color: Palette["colors"][number], format: ExportFormat): string => {
  const { name, shades } = color;

  switch (format) {
    case "json":
      return generateJsonExport(name, shades);
    case "css":
      return generateCssExport(name, shades);
    case "scss":
      return generateScssExport(name, shades);
    case "tailwind":
      return generateTailwindExport(name, shades);
    default:
      throw new Error(`Unsupported export format: ${format}`);
  }
};

function wrapMultipleColors(colorExports: string[], format: ExportFormat): string {
  switch (format) {
    case "json":
      return `[\n${colorExports.map((c) => c.replaceAll("}", " }").replaceAll("{", " {")).join(",\n")}\n]`;
    case "css":
      return colorExports.join("\n\n");
    case "scss":
      return colorExports.join("\n\n");
    case "tailwind":
      return colorExports.join(",\n");
    default:
      return colorExports.join("\n\n");
  }
}

function generateTailwindExport(name: string, shades: string[]): string {
  const colorObject = shades.reduce(
    (acc, shade, index) => {
      acc[`${SHADES_NAMES[index]}`] = shade;
      return acc;
    },
    {} as Record<string, string>,
  );

  return `"${name}": ${JSON.stringify(colorObject, null, 2)}`;
}

function generateCssExport(name: string, shades: string[]): string {
  return shades
    .map((shade, index) => {
      return `--${name}-${SHADES_NAMES[index]}: ${shade};`;
    })
    .join("\n");
}

function generateScssExport(name: string, shades: string[]): string {
  return shades
    .map((shade, index) => {
      return `$${name}-${SHADES_NAMES[index]}: ${shade};`;
    })
    .join("\n");
}

function generateJsonExport(name: string, shades: string[]): string {
  const colorObject = shades.reduce(
    (acc, shade, index) => {
      acc[`${name}-${SHADES_NAMES[index]}`] = shade;
      return acc;
    },
    {} as Record<string, string>,
  );

  return JSON.stringify(colorObject, null, 2);
}
