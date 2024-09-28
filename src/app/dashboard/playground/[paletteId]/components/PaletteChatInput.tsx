"use client";

import { useState } from "react";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useChatWithPalette } from "@/api-client/mutations/useChatWithPalette";
import { cn } from "@/lib/utils";
import Tile from "@/components/ui/tile";

type PaletteChatInputProps = {
  className?: string;
};

const PaletteChatInput = ({ className }: PaletteChatInputProps) => {
  const [promptInput, setPromptInput] = useState("");

  const { mutate, isPending } = useChatWithPalette();

  const handleSubmit = () => {
    mutate({
      userPrompt: promptInput,
    });
  };

  return (
    <Tile className="-mb-2 bg-secondary pb-6">
      <form
        onSubmit={handleSubmit}
        className={cn(
          "relative w-full overflow-hidden rounded-sm border bg-background focus-within:ring-1 focus-within:ring-ring",
          className,
        )}
      >
        <Textarea
          value={promptInput}
          onChange={(e) => setPromptInput(e.currentTarget.value)}
          id="prompt_input"
          placeholder="Ask a follow up..."
          className="h-full min-h-8 border-0 p-3 shadow-none focus-visible:ring-0"
        />
        <div className="absolute bottom-3 right-3 flex items-center pt-0">
          <Button
            type="submit"
            variant="default"
            size="md"
            loading={isPending}
            disabled={isPending}
            className="ml-auto gap-1.5 bg-accent-700/90 text-accent-50 shadow hover:bg-accent-700  dark:bg-accent-600 dark:hover:bg-accent-600/90"
          >
            Send
            <Icons.sendHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </Tile>
  );
};

export default PaletteChatInput;
