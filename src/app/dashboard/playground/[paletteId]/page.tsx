"use client";

import { useEffect } from "react";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import FloatingActions from "./components/FloatingActions";

import AppPage from "@/lib/dashboard/AppPage";
import Playground from "@/lib/palettes/components/Playground";
import HistoryPopover from "@/lib/palettes/components/HistoryPopover";

import { useGetPalette } from "@/api-client/queries/useGetPalette";
import { useThemeCustomizerActions } from "@/hooks/use-theme-config";
import { paletteInsertSchema } from "@/server/validations/palettes.validation";
import PlaygroundProvider from "@/lib/providers/PlaygroundProvider";

type PlaygroundPageProps = {
  params: {
    paletteId: string;
  };
};

const PlaygroundPage = ({ params }: PlaygroundPageProps) => {
  const { data, isLoading, isError, isSuccess } = useGetPalette(params.paletteId, { refetchOnMount: true });
  const { generateThemes } = useThemeCustomizerActions();

  useEffect(() => {
    if (!data) return;
    generateThemes(data);
  }, [data]);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError || !isSuccess) return <h1>Error...</h1>;

  console.log("playground page: ", data);
  console.log("palette schema : ", paletteInsertSchema.shape);

  return (
    <AppPage>
      <AppPage.Header
        title="Enhanced Color Palette Generator"
        description="Create and customize your perfect color palette"
        leftSection={<HistoryButton />}
      />

      <PlaygroundProvider defaultPalette={data}>
        <div className="gap-4">
          <section className="mb-20 space-y-6">
            <Playground />

            <FloatingActions className="fixed bottom-4" />
          </section>
        </div>
      </PlaygroundProvider>
    </AppPage>
  );
};

export default PlaygroundPage;

const HistoryButton = () => (
  <HistoryPopover side="left">
    <Button size="md" variant="outline">
      History
      <Icons.history className="ml-2 size-4" />
    </Button>
  </HistoryPopover>
);
