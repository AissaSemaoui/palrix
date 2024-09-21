import React from "react";

import AppPage from "@/lib/dashboard/AppPage";
import BackgroundBoxes from "@/components/BackgroundBoxes";
import Heading from "@/components/Heading";
import { Input } from "@/components/ui/input";
import Tile from "@/components/ui/tile";
import { PromptInput } from "./playground/components/PromptCard";

const DashboardPage = async () => {
  return (
    <BackgroundBoxes className="h-full">
      <section className="w-full">
        <header className="z-20 mb-4 text-center">
          <Heading type={1} className="mb-2 text-4xl">
            What palette can I create for you?
          </Heading>
          <p className="text-secondary-foreground">
            Turn your color ideas into beautiful, ready-to-use palettes in seconds.
          </p>
        </header>
        <section className="mx-auto w-fit">
          <PromptInput className="w-[512px] max-w-full border-purple-600" />
        </section>
      </section>
    </BackgroundBoxes>
  );
};

export default DashboardPage;
