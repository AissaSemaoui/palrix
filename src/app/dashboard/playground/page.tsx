"use client";

import BackgroundBoxes from "@/components/BackgroundBoxes";
import Heading from "@/components/Heading";
import { PromptInput } from "./[paletteId]/components/PromptCard";

const DashboardPage = () => {
  return (
    <BackgroundBoxes className="h-full">
      <section className="mb-16 w-full">
        <header className="z-20 mb-4 text-center">
          <Heading type={1} className="mb-2 text-4xl">
            What palette can I create for you?
          </Heading>
          <p className="text-secondary-foreground">
            Turn your color ideas into beautiful, ready-to-use palettes in seconds.
          </p>
        </header>
        <section className="mx-auto w-fit">
          <PromptInput
            onSubmit={console.log}
            loading={false}
            disabled={false}
            className="h-24 w-[768px] max-w-full border-purple-600"
          />
        </section>
      </section>
    </BackgroundBoxes>
  );
};

export default DashboardPage;
