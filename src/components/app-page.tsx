import React from "react";

import { cn } from "@/lib/utils";

const AppPage = ({ children, className }: React.PropsWithChildren<{ className?: string }>) => {
  return <main className={cn("p-4", className)}>{children}</main>;
};

export default AppPage;
