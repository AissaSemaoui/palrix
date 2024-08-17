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
  const { data: historyPalettes, isLoading, isSuccess, isError } = useGetPalettes();

  if (isLoading) return <h1>Loading...</h1>;

  if (isError || !isSuccess) return <h1>Error...</h1>;

  return (
    <CardContent className={cn(className)}>
      <CardHeader className="mb-3 p-2 pb-0">
        <CardTitle>History</CardTitle>
      </CardHeader>
      <section className="flex flex-col gap-2">
        {historyPalettes.map((palette) => (
          <PaletteDisplayCard key={palette.id} {...palette} className="border-solid border-border/40" />
        ))}
      </section>
    </CardContent>
  );
};

export default HistoryCard;
