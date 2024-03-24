import pino from "pino";

const getLogger = () => {
  return pino({
    level: "debug",
  });
};

export const logger = getLogger();
