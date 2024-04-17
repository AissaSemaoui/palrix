import React from "react";
import { notFound } from "next/navigation";

import AppPage from "@/lib/dashboard/app-page";
import { requireSession } from "@/lib/hoc/withAuth";

const DashboardPage = async () => {
  const session = await requireSession();

  if (!session) {
    notFound();
  }

  return (
    <React.Fragment>
      <AppPage.Header title="Dashboard Page" description="Next.js starter kit is here :/" />
      <p>Here is the actual dashboard page</p>
    </React.Fragment>
  );
};

export default DashboardPage;
