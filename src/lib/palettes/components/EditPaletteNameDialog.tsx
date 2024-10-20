"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";

type EditPaletteNameDialogProps = React.PropsWithChildren<{
  defaultName?: string;
  onSubmit: (name: string) => void;
  isLoading?: boolean;
}>;

const EditPaletteNameDialog = ({ defaultName, onSubmit, isLoading, children }: EditPaletteNameDialogProps) => {
  const [paletteName, setPaletteName] = useState(defaultName ?? "");

  const handleUpdatePaletteName = () => {
    console.log(paletteName);
    onSubmit(paletteName);
  };

  useEffect(() => {
    if (defaultName) setPaletteName(defaultName);
  }, [defaultName]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Palette Name</DialogTitle>
          <DialogDescription>Enter a new name for your color palette.</DialogDescription>
        </DialogHeader>

        <Input
          defaultValue={paletteName}
          value={paletteName}
          onChange={(e) => setPaletteName(e.target.value)}
          placeholder="Enter palette name"
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button onClick={handleUpdatePaletteName} disabled={isLoading}>
              {isLoading ? <Loader /> : "Save"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditPaletteNameDialog;
