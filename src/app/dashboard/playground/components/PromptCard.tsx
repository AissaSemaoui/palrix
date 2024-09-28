"use client";

import React, { useRef, useState } from "react";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { queryClient, queryKeys } from "@/api-client";
import { useGeneratePalette } from "@/api-client/mutations/useGeneratePalette";
import { paths } from "@/config/navigations";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type PromptInputProps = {
  onSubmit: (prompt: string) => void;
  loading: boolean;
  disabled: boolean;
  className?: string;
};

type PromptCardProps = {
  className?: string;
};

const PromptInput = ({ onSubmit, loading, className, disabled }: PromptInputProps) => {
  const [promptInput, setPromptInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(promptInput);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "relative w-full overflow-hidden rounded-md border bg-background focus-within:ring-1 focus-within:ring-ring",
        className,
      )}
    >
      <Textarea
        value={promptInput}
        onChange={(e) => setPromptInput(e.currentTarget.value)}
        id="prompt_input"
        placeholder={`Describe your website in few words
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

const PromptCard = ({ className }: PromptCardProps) => {
  const router = useRouter();

  const { mutate, status } = useGeneratePalette({
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.getPalettes(),
      });

      router.push(paths.dashboard.playground(data.id));
    },
  });

  const isRandom = useRef(false);

  const handleGeneratePalette = (prompt: string) => {
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
    <div className={cn("flex flex-col gap-2", className)}>
      <PromptInput
        onSubmit={handleGeneratePalette}
        loading={!isRandom.current && status === "pending"}
        disabled={status === "pending"}
        className="border-purple-500"
      />
      <Button
        type="button"
        variant="outline"
        size="md"
        onClick={handleGenerateRandomPalette}
        disabled={status === "pending"}
        loading={isRandom.current && status === "pending"}
        className="w-fit"
      >
        <Icons.refresh className="mr-2 h-4 w-4" />
        Random
      </Button>
    </div>
  );
};

export default PromptCard;
