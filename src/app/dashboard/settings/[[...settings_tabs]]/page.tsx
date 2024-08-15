import AppPage from "@/lib/dashboard/AppPage";
import { UserButton, UserProfile } from "@clerk/nextjs";
import React from "react";

type SettingsProps = {};

const SettingsPage = ({}: SettingsProps) => {
  return (
    <main>
      <AppPage.Header title="Settings" />

      <section>
        <UserProfile />
      </section>
    </main>
  );
};

export default SettingsPage;
