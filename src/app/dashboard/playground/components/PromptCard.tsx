import React from "react";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Illustrations } from "@/components/illustrations";
import { Icons } from "@/components/icons";
import Heading from "@/components/heading";

type PromptInputProps = {};

type PromptCardProps = {};

const PromptInput = ({}: PromptInputProps) => {
  return (
    <div className="flex items-center gap-2">
      <Input id="prompt_input" placeholder="Ex. A website for a coffee shop" className="h-12 bg-white" />
      <Button
        variant="default"
        size="icon"
        className="h-11 w-11 bg-accent-600 shadow hover:bg-accent-700 active:bg-accent-800"
      >
        <Icons.sendHorizontal className="h-5 w-5" />
      </Button>
    </div>
  );
};

const PromptCard = ({}: PromptCardProps) => {
  return (
    <Card className="flex w-3/4 items-center bg-muted">
      <Illustrations.paint className="h-56" />

      <div className="h-max w-full bg-muted">
        <CardHeader className="pb-2">
          <Heading type={3} order={3} className="font-semibold">
            Describe your website in a few words
          </Heading>
        </CardHeader>

        <CardContent>
          <PromptInput />
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
