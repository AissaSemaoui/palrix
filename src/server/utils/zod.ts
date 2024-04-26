import { generateError, type ErrorMessageOptions } from "zod-error";
import type { ZodError } from "zod";

const options: ErrorMessageOptions = {
  // maxErrors: 2,
  delimiter: {
    component: " - ",
  },
  code: {
    enabled: true,
    label: "Zod Code: ",
  },
  message: {
    enabled: true,
    label: "Message: ",
  },
};

export const generateZodError = (error: ZodError) => generateError(error, options);
