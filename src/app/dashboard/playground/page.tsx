import React from "react";

import AppPage from "@/lib/dashboard/AppPage";
import Playground from "@/lib/palettes/Playground";
import PromptCard from "./components/PromptCard";

type PlaygroundPageProps = {};

const PlaygroundPage = (props: PlaygroundPageProps) => {
  return (
    <main className="mx-auto w-full xl:w-4/5">
      <AppPage.Header title="Playground" description="Color generation center" />

      <section className="space-y-6">
        <PromptCard />

        <Playground className="mb-2" />
      </section>
    </main>
  );
};

export default PlaygroundPage;
