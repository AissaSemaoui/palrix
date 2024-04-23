import React from "react";

import AppPage from "@/lib/dashboard/AppPage";
import PromptCard from "./components/PromptCard";

type PlaygroundPageProps = {};

const PlaygroundPage = (props: PlaygroundPageProps) => {
  return (
    <>
      <AppPage.Header title="Hi George," description="What do you wanna generate today?" />

      <section>
        <PromptCard />
      </section>
    </>
  );
};

export default PlaygroundPage;
