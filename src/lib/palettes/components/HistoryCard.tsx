"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import React from "react";
import PaletteDisplayCard from "./PaletteDisplayCard";
import { db } from "@/server/db";
import { palettes } from "@/server/db/schema";
import { cn } from "@/lib/utils";
import { desc } from "drizzle-orm";
import { useGetPalettes } from "@/api-client/queries/useGetPalettes";

type HistoryCardProps = {
  className?: string;
};

const HistoryCard = ({ className }: HistoryCardProps) => {
  console.log("we are here before?!");
  const { data: historyPalettes, isLoading, isError } = useGetPalettes();

  console.log(historyPalettes);

  if (isLoading) return <h1>Loading...</h1>;

  if (isError) return <h1>Error...</h1>;

  return (
    <Card className={cn("rounded-md", className)}>
      <CardContent className="h-screen min-h-80 overflow-y-auto p-2">
        <CardHeader className="mb-3 p-2 pb-0">
          <CardTitle>History</CardTitle>
        </CardHeader>
        <section className="flex flex-col gap-2">
          {historyPalettes.map((palette) => (
            <PaletteDisplayCard key={palette.id} {...palette} className="border-solid border-border/40" />
          ))}
        </section>
      </CardContent>
    </Card>
  );
};

export default HistoryCard;
