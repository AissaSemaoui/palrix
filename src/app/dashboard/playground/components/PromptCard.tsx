"use client";

import React, { useDeferredValue, useEffect, useRef, useState } from "react";

import Heading from "@/components/Heading";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/Icons";
import { Illustrations } from "@/components/Illustrations";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/Card";

import { useGeneratePalette } from "@/api-client/mutations/useGeneratePalette";
import { usePlaygroundActions, usePlaygroundStatus, usePrompt } from "@/hooks/use-playground";
import { queryClient, queryKeys } from "@/api-client";

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
    <form
      onSubmit={handleSubmit}
      className="relative w-full overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
    >
      <Textarea
        value={promptInput}
        onChange={(e) => setPromptInput(e.currentTarget.value)}
        id="prompt_input"
        placeholder="Ex. A website for a coffee shop"
        className="h-full min-h-8 border-0 p-3 shadow-none focus-visible:ring-0"
      />
      <div className="absolute bottom-3 right-3 flex items-center pt-0">
        <Button
          type="submit"
          variant="default"
          size="md"
          loading={loading}
          disabled={disabled}
          className="ml-auto gap-1.5 bg-accent-700/90 text-accent-50 shadow hover:bg-accent-700  dark:bg-accent-600 dark:hover:bg-accent-600/90"
        >
          Generate
          <Icons.sendHorizontal className="h-3.5 w-3.5" />
        </Button>
      </div>
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
      queryClient.invalidateQueries({
        queryKey: queryKeys.getPalettes(),
      });
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

        <CardFooter className="space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleGenerateRandomPalette}
            disabled={status === "loading"}
            loading={isRandom.current && status === "loading"}
          >
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
