import React from "react";
import { cn } from "../utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Tile from "@/components/ui/Tile";
import { Button } from "@/components/ui/Button";
import PaletteCard from "./PaletteCard";

type PlaygroundActionsProps = {
  className?: string;
};

type PlaygroundProps = {
  className?: string;
};

const PlaygroundActions = ({ className }: PlaygroundActionsProps) => {
  return (
    <Tile className={cn("space-x-2 border-none p-4", className)}>
      <Button variant="outline">Export</Button>
      <Button variant="outline">Save</Button>
    </Tile>
  );
};

const Playground = ({ className }: PlaygroundProps) => {
  return (
    <section className={cn("", className)}>
      <PlaygroundActions className="mb-3" />

      <div className="space-y-2">
        <PaletteCard />
        <PaletteCard />
      </div>
    </section>
  );
};

export default Playground;
