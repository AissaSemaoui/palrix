import React, { useState } from "react";
import toast from "react-hot-toast";

import AnimatedTabs from "@/components/AnimatedTabs";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import { copyToClipboard } from "@/lib/utils";
import type { ColorSpace, ExportFormat, Palette } from "@/server/types";

import { generateColorExport } from "./utils/generateColorExport";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { COLOR_SPACES } from "@/config/constants";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/Label";

type ExportDialogProps = React.PropsWithChildren<{
  colors: Palette["colors"] | Palette["colors"][number];
}>;

type FormatTab = { title: string; value: ExportFormat };

const ExportDialog = ({ colors, children }: ExportDialogProps) => {
  const [colorFormat, setColorFormat] = useState<ColorSpace>("hex");
  const [fullFormat, setFullFormat] = useState(false);

  const ITEMS: FormatTab[] = [
    {
      title: "Tailwind",
      value: "tailwind",
    },
    {
      title: "CSS",
      value: "css",
    },
    {
      title: "SCSS",
      value: "scss",
    },
    {
      title: "JSON",
      value: "json",
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-screen max-w-screen-sm overflow-x-hidden">
        <DialogHeader>
          <DialogTitle>Export Your Palette</DialogTitle>
          <DialogDescription>Choose a format to export your color palette.</DialogDescription>

          <div className="flex justify-end gap-4">
            <div className="flex items-center gap-2">
              <Switch checked={fullFormat} onCheckedChange={setFullFormat} id="full-format" />
              <Label htmlFor="full-format">Full Format</Label>
            </div>
            <Select value={colorFormat} onValueChange={(value) => setColorFormat(value as ColorSpace)}>
              <SelectTrigger className="h-8 w-[140px]">
                <SelectValue placeholder="Color format" />
              </SelectTrigger>
              <SelectContent>
                {COLOR_SPACES.map((space) => (
                  <SelectItem key={space} value={space} className="capitalize">
                    {space}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </DialogHeader>

        <section className="w-full max-w-full">
          <AnimatedTabs items={ITEMS} className="">
            {(item) => (
              <CodeDisplay
                key={item.value}
                content={generateColorExport(colors, item.value, colorFormat, fullFormat)}
              />
            )}
          </AnimatedTabs>
        </section>

        <DialogFooter>
          <DialogClose asChild>
            <Button>Done</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const CodeDisplay = ({ content }: { content: string }) => {
  const handleCopy = async () => {
    await copyToClipboard(content);
    toast.success("Palette Copied Successfully!");
  };

  return (
    <ScrollArea className="relative h-96 w-full rounded-md bg-muted px-2 text-muted-foreground">
      <Button variant="outline" className="absolute right-4 top-2" onClick={handleCopy}>
        Copy Code
      </Button>

      <pre className="w-full bg-muted p-4">{content}</pre>
    </ScrollArea>
  );
};

export default ExportDialog;
