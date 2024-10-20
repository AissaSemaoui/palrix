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

type EditColorNameDialogProps = React.PropsWithChildren<{
  defaultName?: string;
  onSubmit: (name: string) => void;
  isLoading?: boolean;
}>;

const EditColorNameDialog = ({ defaultName, onSubmit, isLoading, children }: EditColorNameDialogProps) => {
  const [colorName, setColorName] = useState(defaultName);

  const handleUpdateColorName = () => {
    console.log(colorName);
    if (colorName) onSubmit(colorName);
  };

  useEffect(() => {
    if (defaultName) setColorName(defaultName);
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
            <Button variant="outline" disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>

          <Button onClick={handleUpdateColorName} disabled={isLoading}>
            {isLoading ? <Loader /> : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditColorNameDialog;
