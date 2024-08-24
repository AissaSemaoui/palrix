import React from "react";

import CardsDemo from "@/lib/examples/components";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import ThemeCustomizer from "@/lib/examples/components/ThemeCustomizer";

type UiExamplesDrawerProps = React.PropsWithChildren<{}>;

const UiExamplesDrawer = ({ children }: UiExamplesDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>

        <ScrollArea className="h-[640px] px-4">
          <ThemeCustomizer>
            <CardsDemo className="container pb-4" />
          </ThemeCustomizer>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default UiExamplesDrawer;
