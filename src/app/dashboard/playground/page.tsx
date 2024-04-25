import React from "react";

import AppPage from "@/lib/dashboard/AppPage";
import Playground from "@/lib/palettes/Playground";
import PromptCard from "./components/PromptCard";

type PlaygroundPageProps = {};

const PlaygroundPage = (props: PlaygroundPageProps) => {
  return (
    <>
      <AppPage.Header title="Hi George," description="What do you wanna generate today?" />

      <section className="space-y-4 xl:w-3/4">
        <PromptCard />

        <Playground className="mb-2" />
      </section>
    </>
  );
};

export default PlaygroundPage;
