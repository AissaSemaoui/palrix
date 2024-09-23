import AppPage from "@/lib/dashboard/AppPage";
import { UserButton, UserProfile } from "@clerk/nextjs";
import React from "react";

type SettingsProps = {};

const SettingsPage = ({}: SettingsProps) => {
  return (
    <AppPage>
      <AppPage.Header title="Settings" />

      <section>
        <UserProfile />
      </section>
    </AppPage>
  );
};

export default SettingsPage;
