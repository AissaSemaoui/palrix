import React from "react";

import AppNav from "@/lib/dashboard/AppNav";
import AppPage from "@/lib/dashboard/AppPage";
import AppSidebar from "@/lib/dashboard/AppSidebar";
import ProtectedProvider from "@/lib/providers/ProtectedProvider";

const DashboardLayout = async ({ children }: React.PropsWithChildren) => {
  return (
    <ProtectedProvider>
      <div className="flex flex-1 flex-col">
        <AppNav className="sticky top-0 z-50 h-14" />
        <div className="flex h-full w-full flex-1">
          <AppSidebar className="sticky top-14 h-[calc(100vh-56px)]" />
          <AppPage className="container flex-1">{children}</AppPage>
        </div>
      </div>
    </ProtectedProvider>
  );
};

export default DashboardLayout;
