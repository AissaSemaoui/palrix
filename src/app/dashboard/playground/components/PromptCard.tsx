"use client";

import React, { useDeferredValue, useEffect, useRef, useState } from "react";

import Heading from "@/components/Heading";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/Icons";
import { Illustrations } from "@/components/Illustrations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

import { useGeneratePalette } from "@/api-client/mutations/useGeneratePalette";
import { usePlaygroundActions, usePlaygroundStatus, usePrompt } from "@/hooks/use-playground";
import { queryClient, queryKeys } from "@/api-client";
import Tile from "@/components/ui/tile";

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
        placeholder={`Describe your website in few words;
Ex. A coffee shop website`}
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
          Surprise me
          <Icons.magic className="h-4 w-4" />
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
    <Tile shadow="lg" className="-mb-2 flex items-end gap-4 bg-secondary pb-6">
      <PromptInput
        onSubmit={handleGeneratePalette}
        loading={!isRandom.current && status === "loading"}
        disabled={status === "loading"}
      />
      <Button
        type="button"
        variant="outline"
        size="md"
        onClick={handleGenerateRandomPalette}
        disabled={status === "loading"}
        loading={isRandom.current && status === "loading"}
      >
        <Icons.refresh className="mr-2 h-4 w-4" />
        Random
      </Button>
    </Tile>
  );
};

export default PromptCard;
