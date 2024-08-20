import React from "react";

import { Icons } from "@/components/Icons";

type LoaderProps = {};

export const Loader = ({}: LoaderProps) => {
  return <Icons.loader className="animate-spin" />;
};
