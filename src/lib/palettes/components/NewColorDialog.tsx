"use client";

import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormMessage, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { zodResolver } from "@hookform/resolvers/zod";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";

const NewColorFormValidation = z.object({
  name: z.string().min(3),
  method: z.enum(["ai", "manual"]),
  baseColor: z.string(),
  colorDescription: z.string(),
});

type NewColorDialogProps = React.PropsWithChildren;

type NewColorFormTypes = z.infer<typeof NewColorFormValidation>;

const NewColorDialog = ({ children }: NewColorDialogProps) => {
  const form = useForm<NewColorFormTypes>({
    resolver: zodResolver(NewColorFormValidation),
  });

  const { register, watch, control } = form;

  const method = watch("method");
  const errors = form.formState.errors;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(console.log)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Add New Color</DialogTitle>
              <DialogDescription>Choose how you want to create your new color.</DialogDescription>
            </DialogHeader>

            <FormItem>
              <FormLabel htmlFor="new-color-name">Name</FormLabel>
              <Input id="new-color-name" placeholder="Ex. Danger" {...register("name")} />
              <FormMessage>{errors.name?.message}</FormMessage>
            </FormItem>

            <FormField
              control={control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pick how you wanna add your new color</FormLabel>
                  <FormControl>
                    <RadioGroup {...field} value={field.value} onValueChange={field.onChange}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ai" id="ai" />
                        <Label htmlFor="ai">Generate with AI</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="manual" id="manual" />
                        <Label htmlFor="manual">Pick Base Color</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {method === "ai" && (
              <FormItem>
                <FormLabel htmlFor="new-color-description">Quick description for the color</FormLabel>
                <Input
                  id="new-color-description"
                  placeholder="Ex. Color for errors"
                  {...register("colorDescription")}
                />
                <FormMessage>{errors.colorDescription?.message}</FormMessage>
              </FormItem>
            )}

            {method === "manual" && (
              <FormItem>
                <FormLabel htmlFor="new-color-base-color">Base Color</FormLabel>
                <Input
                  id="new-color-base-color"
                  type="color"
                  placeholder="Ex. Color for errors"
                  {...register("baseColor")}
                />
                <FormMessage>{errors.baseColor?.message}</FormMessage>
              </FormItem>
            )}

            <DialogFooter>
              <Button
                type="submit"
                variant="default"
                className="ml-auto gap-1.5 bg-accent-700/90 text-accent-50 shadow hover:bg-accent-700  dark:bg-accent-600 dark:hover:bg-accent-600/90"
              >
                Surprise me
                <Icons.magic className="h-4 w-4" />
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewColorDialog;
