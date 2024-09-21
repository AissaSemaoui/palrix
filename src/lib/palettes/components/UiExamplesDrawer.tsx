import React from "react";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import CardsDemo from "@/lib/examples/components";
import ThemeCustomizer from "@/lib/examples/components/ThemeCustomizer";
import ThemeMapper from "./ThemeMapper";

type UiExamplesDrawerProps = React.PropsWithChildren<{}>;

const UiExamplesDrawer = ({ children }: UiExamplesDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent className="container">
        <DrawerClose className="absolute right-4 top-4" asChild>
          <Button variant="ghost" size="icon-sm">
            <Icons.close className="h-4 w-4" />
          </Button>
        </DrawerClose>

        <DrawerHeader>
          <DrawerTitle>Examples with your preferred color palette?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>

        <ScrollArea className="h-[640px] px-4">
          <ThemeCustomizer>
            <CardsDemo className="pb-4" />
          </ThemeCustomizer>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default UiExamplesDrawer;
