import AppPage from "@/lib/dashboard/AppPage";
import Playground from "@/lib/palettes/components/Playground";
import PromptCard from "./components/PromptCard";
import HistoryCard from "@/lib/palettes/components/HistoryCard";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/Button";

type PlaygroundPageProps = {};

const PlaygroundPage = ({}: PlaygroundPageProps) => {
  return (
    <main className="mx-auto w-full ">
      <AppPage.Header title="Playground" description="Color generation center" />

      <div className="flex gap-4">
        <section className="flex-1 space-y-6">
          <PromptCard />

          <Playground className="mb-2" />
        </section>

        <section>
          <Popover>
            <PopoverTrigger asChild>
              <Button size="icon" variant="outline">
                <Icons.history />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="h-screen w-96 overflow-auto">
              <HistoryCard className="sticky top-2 p-0" />
            </PopoverContent>
          </Popover>
        </section>
      </div>
    </main>
  );
};

export default PlaygroundPage;
