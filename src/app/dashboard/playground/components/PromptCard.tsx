"use client";

import React, { useState } from "react";
import { useDebounce } from "react-use";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/Card";
import { Illustrations } from "@/components/Illustrations";
import { Icons } from "@/components/Icons";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Heading from "@/components/Heading";

import { mutations, requests } from "@/api-client";
import { usePlaygroundActions, usePlaygroundStatus, usePrompt } from "@/hooks/use-playground";

type PromptInputProps = {
  onSubmit: () => void;
};

type PromptCardProps = {};

const PromptInput = ({ onSubmit }: PromptInputProps) => {
  const status = usePlaygroundStatus();

  const { setPrompt } = usePlaygroundActions();

  const [promptInput, setPromptInput] = useState("");

  useDebounce(
    () => {
      setPrompt(promptInput);
    },
    1000,
    [promptInput],
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        value={promptInput}
        onChange={(e) => setPromptInput(e.currentTarget.value)}
        id="prompt_input"
        placeholder="Ex. A website for a coffee shop"
        className="h-12 bg-white"
      />

      <Button
        type="submit"
        variant="default"
        size="icon"
        loading={status === "loading"}
        className="h-11 w-11 bg-accent-700/90 text-accent-50 shadow hover:bg-accent-700  dark:bg-accent-600 dark:hover:bg-accent-600/90"
      >
        <Icons.sendHorizontal className="h-5 w-5" />
      </Button>
    </form>
  );
};

const PromptCard = ({}: PromptCardProps) => {
  const { setSelectedPalette, setStatus } = usePlaygroundActions();

  const prompt = usePrompt();

  const { mutate } = mutations.useGeneratePalette({
    onMutate: () => setStatus("loading"),
    onSettled: () => setStatus("idle"),
    onSuccess: (data) => {
      setSelectedPalette(data);
      setStatus("success");
    },
    onError: (error) => {
      console.error(error);
      setStatus("error");
    },
  });

  const handleGeneratePalette = () => {
    mutate({
      userPrompt: prompt,
    });
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
          <PromptInput onSubmit={handleGeneratePalette} />
        </CardContent>

        <CardFooter className="space-x-2">
          <Button variant="outline">
            <Icons.dices className="mr-2 h-5 w-5" />
            Random
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default PromptCard;
