import * as z from "zod";

import { ValidationError } from "@server/utils/errors";
import { generateZodError } from "@server/utils/zod";
import type { ExpressMiddleware } from "@server/types";

type Validate = (validationSchema: z.AnyZodObject) => ExpressMiddleware;

export const validate: Validate = (validationSchema) => async (req, res, next) => {
  try {
    validationSchema.parse(req);
    next();
  } catch (error) {
    console.log(generateZodError(error as z.ZodError).message);

    next(new ValidationError(generateZodError(error as z.ZodError).message));
  }
};
