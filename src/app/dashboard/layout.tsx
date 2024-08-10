import React from "react";

import AppNav from "@/lib/dashboard/AppNav";
import AppPage from "@/lib/dashboard/AppPage";
import AppSidebar from "@/lib/dashboard/AppSidebar";

import { requireSession } from "@/lib/auth/require-session";
import AuthProvider from "@/lib/providers/AuthProvider";

const DashboardLayout = async ({ children }: React.PropsWithChildren) => {
  const appSession = await requireSession();

  return (
    <AuthProvider initialSession={appSession}>
      <div className="flex flex-1 flex-col">
        <AppNav />
        <div className="flex h-full w-full flex-1">
          <AppSidebar />
          <AppPage className="container flex-1">{children}</AppPage>
        </div>
      </div>
    </AuthProvider>
  );
};

export default DashboardLayout;
