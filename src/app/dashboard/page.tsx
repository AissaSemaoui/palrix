import React from "react";

import AppPage from "@/lib/dashboard/AppPage";

const DashboardPage = async () => {
  return (
    <>
      <AppPage.Header title="Dashboard Page" description="Next.js starter kit is here :/" />
      <p>Here is the actual dashboard page</p>
    </>
  );
};

export default DashboardPage;
