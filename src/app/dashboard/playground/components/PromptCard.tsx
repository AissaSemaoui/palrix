"use client";

import React, { useDeferredValue, useEffect, useRef, useState } from "react";
import { useDebounce } from "react-use";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/Card";
import { Illustrations } from "@/components/Illustrations";
import { Icons } from "@/components/Icons";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Heading from "@/components/Heading";

import { usePlaygroundActions, usePlaygroundStatus, usePrompt } from "@/hooks/use-playground";
import { useGeneratePalette } from "@/api-client/mutations/useGeneratePalette";
import AppPage from "@/lib/dashboard/AppPage";

type PromptInputProps = {
  onSubmit: () => void;
  loading: boolean;
  disabled: boolean;
};

type PromptCardProps = {};

const PromptInput = ({ onSubmit, loading, disabled }: PromptInputProps) => {
  const { setPrompt } = usePlaygroundActions();

  const [promptInput, setPromptInput] = useState("");

  const deferredPrompt = useDeferredValue(promptInput);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  useEffect(() => {
    setPrompt(deferredPrompt);
  }, [deferredPrompt]);

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
        loading={loading}
        disabled={disabled}
        className="h-11 w-11 bg-accent-700/90 text-accent-50 shadow hover:bg-accent-700  dark:bg-accent-600 dark:hover:bg-accent-600/90"
      >
        <Icons.sendHorizontal className="h-5 w-5" />
      </Button>
    </form>
  );
};

const PromptCard = ({}: PromptCardProps) => {
  const { setSelectedPalette, setStatus } = usePlaygroundActions();
  const status = usePlaygroundStatus();

  const prompt = usePrompt();

  const { mutate } = useGeneratePalette({
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

  const isRandom = useRef(false);

  const handleGeneratePalette = () => {
    isRandom.current = false;
    mutate({
      userPrompt: prompt,
    });
  };

  const handleGenerateRandomPalette = () => {
    isRandom.current = true;
    mutate({
      userPrompt: "Random",
    });
  };

  return (
    <Card className="flex items-center overflow-hidden bg-secondary">
      <div className="h-max w-full bg-secondary">
        <CardHeader className="pb-3">
          <Heading type={3} order={3} className="font-semibold">
            Describe your website in a few words
          </Heading>
        </CardHeader>

        <CardContent>
          <PromptInput
            onSubmit={handleGeneratePalette}
            loading={!isRandom.current && status === "loading"}
            disabled={status === "loading"}
          />
        </CardContent>

        <CardFooter className="space-x-2" onClick={handleGenerateRandomPalette}>
          <Button variant="outline" disabled={status === "loading"} loading={isRandom.current && status === "loading"}>
            <Icons.dices className="mr-2 h-5 w-5" />
            Random
          </Button>
        </CardFooter>
      </div>

      <Illustrations.paint className="hidden h-48 dark:bg-secondary-foreground md:block" />
    </Card>
  );
};

export default PromptCard;
