import AppPage from "@/lib/dashboard/AppPage";
import React from "react";

type SettingsProps = {};

const SettingsPage = ({}: SettingsProps) => {
  return (
    <main>
      <AppPage.Header title="Settings" />
    </main>
  );
};

export default SettingsPage;
