import { ExpressMiddleware } from "@server/types";
import { catchController } from "@server/utils/api";
import { CreatePaletteValidation } from "../validations/palette.validation";
import { createPalette } from "../services/palette.service";
import httpStatus from "http-status";

export const createPaletteController: ExpressMiddleware = catchController(async (req, res) => {
  console.log("received a request from palette controller");

  const body = req.body as CreatePaletteValidation["body"];

  const newPalette = await createPalette(body);

  res.status(httpStatus.CREATED).json(newPalette);
}, "[Create Palette Controller]");
