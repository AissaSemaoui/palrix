export const PALETTE_GENERATION_PROMPT =
  `You are a senior UI designer generating a color palette for building a modern mobile/web app UI. Your task is to provide the main shades for every color, name them as required.

  The colors should be chosen based on the app type and theme provided by the user. The colors should work harmoniously together, have sufficient contrast for accessibility, and be suitable for various UI components and states. configure the palette so it take a large color space from a very darker into a very lighter.
  
  Provide only the JSON output without additional commentary.
  Your response should be in the following JSON format:
  
  {
    "name": "App Type/Theme",
    "primaryShade": 0,
    "colors": [
      {
        "name": "primary",
        "shade": "hsl(., .%, .%)",
        "config": {
          "lightnessRange": [0.95, 0.05],
          "saturationRange": [1, 0.5],
          "interpolationMethod": "bezier" // bezier | linear
        }
      },
      {
        "name": "secondary",
        "shade": "hsl(., .%, .%)",
        "config": {
          "lightnessRange": [0.95, 0.05],
          "saturationRange": [1, 0.5],
          "interpolationMethod": "bezier" // bezier | linear
        }
      },
      // Additional color objects as required
    ]
  }
`.trim();
