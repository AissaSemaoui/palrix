import React from "react";

import AppNav from "@/lib/dashboard/app-nav";
import AppPage from "@/lib/dashboard/app-page";
import AppSidebar from "@/lib/dashboard/app-sidebar";

import { requireSession } from "@/lib/auth/require-session";

const DashboardLayout = async ({ children }: React.PropsWithChildren) => {
  await requireSession();

  return (
    <div className="flex flex-1 flex-col">
      <AppNav />
      <div className="flex h-full w-full flex-1">
        <AppSidebar />
        <AppPage>{children}</AppPage>
      </div>
    </div>
  );
};

export default DashboardLayout;
