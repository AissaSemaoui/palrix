import AppPage from "@/lib/dashboard/AppPage";
import Playground from "@/lib/palettes/components/Playground";
import HistoryCard from "@/lib/palettes/components/HistoryCard";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import PromptCard from "./components/PromptCard";
import FloatingActions from "./components/FloatingActions";

type PlaygroundPageProps = {};

const PlaygroundPage = ({}: PlaygroundPageProps) => {
  return (
    <AppPage className="mx-auto">
      <AppPage.Header
        title="Enhanced Color Palette Generator"
        description="Create and customize your perfect color palette"
        leftSection={<HistoryButton />}
      />

      <div className="gap-4">
        <section className="mb-2 ml-auto w-min"></section>

        <section className="mb-20 space-y-6">
          <Playground />

          <FloatingActions className="fixed bottom-4" />
        </section>
      </div>
    </AppPage>
  );
};

export default PlaygroundPage;

const HistoryButton = () => (
  <Popover>
    <PopoverTrigger asChild>
      <Button size="md" variant="outline">
        History
        <Icons.history className="ml-2 size-4" />
      </Button>
    </PopoverTrigger>
    <PopoverContent asChild>
      <ScrollArea className="h-[600px] w-96 px-3">
        <HistoryCard className="sticky top-2 px-1" />
      </ScrollArea>
    </PopoverContent>
  </Popover>
);
