"use client";

import React from "react";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/Card";
import { Illustrations } from "@/components/Illustrations";
import { Icons } from "@/components/Icons";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Heading from "@/components/Heading";

import { requests } from "@/api-client";
import { usePlaygroundActions } from "@/hooks/use-playground";

type PromptInputProps = {};

type PromptCardProps = {};

const PromptInput = ({}: PromptInputProps) => {
  return (
    <div className="flex items-center gap-2">
      <Input id="prompt_input" placeholder="Ex. A website for a coffee shop" className="h-12 bg-white" />
      <Button
        variant="default"
        size="icon"
        className="h-11 w-11 bg-accent-700/90 text-accent-50 shadow hover:bg-accent-700  dark:bg-accent-600 dark:hover:bg-accent-600/90"
      >
        <Icons.sendHorizontal className="h-5 w-5" />
      </Button>
    </div>
  );
};

const PromptCard = ({}: PromptCardProps) => {
  const { setSelectedPalette } = usePlaygroundActions();

  const handleCreatePalette = () => {
    requests
      .generatePalette({
        userPrompt: "Freelancing Platform for security field",
      })
      .then(setSelectedPalette)
      .catch(console.error);
  };

  return (
    <Card className="flex items-center bg-secondary">
      <Illustrations.paint className="hidden h-56 text-red-800 md:block" />

      <div className="h-max w-full bg-secondary">
        <CardHeader className="pb-2">
          <Heading type={3} order={3} className="font-semibold">
            Describe your website in a few words
          </Heading>
        </CardHeader>

        <CardContent>
          <PromptInput />
        </CardContent>

        <CardFooter className="space-x-2">
          <Button variant="outline" onClick={handleCreatePalette}>
            <Icons.dices className="mr-2 h-5 w-5" />
            Random
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default PromptCard;
