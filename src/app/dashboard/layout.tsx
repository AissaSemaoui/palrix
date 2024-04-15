import React from "react";

import AppNav from "@/components/app-nav";
import AppPage from "@/components/app-page";
import AppSidebar from "@/components/app-sidebar";

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
