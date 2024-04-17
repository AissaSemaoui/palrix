import React from "react";

import AppNav from "@/lib/dashboard/app-nav";
import AppPage from "@/lib/dashboard/app-page";
import AppSidebar from "@/lib/dashboard/app-sidebar";

const DashboardLayout = ({ children }: React.PropsWithChildren) => {
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
