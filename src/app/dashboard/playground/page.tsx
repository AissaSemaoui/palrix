import AppPage from "@/lib/dashboard/AppPage";
import Playground from "@/lib/palettes/components/Playground";
import PromptCard from "./components/PromptCard";
import HistoryCard from "@/lib/palettes/components/HistoryCard";

type PlaygroundPageProps = {};

const PlaygroundPage = ({}: PlaygroundPageProps) => {
  return (
    <main className="mx-auto w-full ">
      <AppPage.Header title="Playground" description="Color generation center" />

      <div className="grid grid-cols-12 gap-4">
        <section className="col-span-8 space-y-6">
          <PromptCard />

          <Playground className="mb-2" />
        </section>
        <section className="col-span-4">
          <HistoryCard className="sticky top-2" />
        </section>
      </div>
    </main>
  );
};

export default PlaygroundPage;
