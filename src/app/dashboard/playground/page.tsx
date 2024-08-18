import AppPage from "@/lib/dashboard/AppPage";
import Playground from "@/lib/palettes/components/Playground";
import HistoryCard from "@/lib/palettes/components/HistoryCard";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/Button";
import { ScrollArea } from "@/components/ui/scroll-area";

import PromptCard from "./components/PromptCard";

type PlaygroundPageProps = {};

const PlaygroundPage = ({}: PlaygroundPageProps) => {
  return (
    <main className="mx-auto w-full ">
      <AppPage.Header title="Playground" description="Color generation center" leftSection={<HistoryButton />} />

      <div className="gap-4">
        <section className="mb-2 ml-auto w-min"></section>

        <section className="space-y-6">
          <PromptCard />

          <Playground className="mb-2" />
        </section>
      </div>
    </main>
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
