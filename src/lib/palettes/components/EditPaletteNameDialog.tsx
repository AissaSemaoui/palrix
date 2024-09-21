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

type EditPaletteNameDialogProps = React.PropsWithChildren<{
  defaultName?: string;
}>;

const EditPaletteNameDialog = ({ defaultName, children }: EditPaletteNameDialogProps) => {
  const [paletteName, setPaletteName] = useState(defaultName);

  const handleUpdatePaletteName = () => {
    console.log(paletteName);
  };

  useEffect(() => {
    setPaletteName(defaultName);
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
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button onClick={handleUpdatePaletteName}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditPaletteNameDialog;
