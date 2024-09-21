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

type EditColorNameDialogProps = React.PropsWithChildren<{
  defaultName?: string;
}>;

const EditColorNameDialog = ({ defaultName, children }: EditColorNameDialogProps) => {
  const [colorName, setColorName] = useState(defaultName);

  const handleUpdateColorName = () => {
    console.log(colorName);
  };

  useEffect(() => {
    setColorName(defaultName);
  }, [defaultName]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Color Name</DialogTitle>
          <DialogDescription>Enter a new name for your color color.</DialogDescription>
        </DialogHeader>

        <Input
          defaultValue={colorName}
          value={colorName}
          onChange={(e) => setColorName(e.target.value)}
          placeholder="Enter color name"
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button onClick={handleUpdateColorName}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditColorNameDialog;
