import BackgroundBoxes from "@/components/BackgroundBoxes";
import Heading from "@/components/Heading";
import PromptCard from "./components/PromptCard";

const DashboardPage = () => {
  return (
    <BackgroundBoxes className="h-full">
      <section className="mx-auto mb-16">
        <header className="z-20 mb-4 text-center">
          <Heading type={1} className="mb-2 text-4xl">
            What palette can I create for you?
          </Heading>
          <p className="text-secondary-foreground">
            Turn your color ideas into beautiful, ready-to-use palettes in seconds.
          </p>
        </header>
        <section className="mx-auto max-w-screen-md">
          <PromptCard className="w-full" />
        </section>
      </section>
    </BackgroundBoxes>
  );
};

export default DashboardPage;
