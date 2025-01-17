"use client";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import Tile from "@/components/ui/tile";
import PaletteCard from "./PaletteCard";

import { useGetPalette } from "@/api-client/queries/useGetPalette";
import { Icons } from "@/components/Icons";
import { cn } from "@/lib/utils";
import EditPaletteNameDialog from "./EditPaletteNameDialog";
import NewColorDialog from "./NewColorDialog";
import { useUpdatePalette } from "@/api-client/mutations/useUpdatePalette";
import toast from "react-hot-toast";
import { queryClient, queryKeys } from "@/api-client";
import PlaygroundProvider from "@/lib/providers/PlaygroundProvider";
import { Palette } from "@/server/types";
import { usePlayground } from "@/hooks/use-playground";

interface PlaygroundProps {
  className?: string;
}

const Playground = ({ className }: PlaygroundProps) => {
  const { currentPalette } = usePlayground();

  const { mutate: updatePaletteAsync, isPending } = useUpdatePalette(currentPalette.id, {
    onSuccess: () => {
      toast.success("Palette Updated Successfully!");
      queryClient.invalidateQueries({ queryKey: queryKeys.getPalette(currentPalette.id) });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const handleUpdatePaletteName = (paletteName: string) => {
    updatePaletteAsync({
      name: paletteName,
    });
  };

  return (
    <section className={cn("rounded-md", className)}>
      <div className="mb-4 mt-8 py-2">
        <div className="flex w-fit items-center gap-4">
          <div className="flex items-center gap-1">
            <Heading type={2}>{currentPalette.name}</Heading>

            <EditPaletteNameDialog
              defaultName={currentPalette.name}
              onSubmit={handleUpdatePaletteName}
              isLoading={isPending}
            >
              <Button variant="ghost" size="icon">
                <Icons.edit className="h-4 w-4" />
              </Button>
            </EditPaletteNameDialog>
          </div>

          <div className="space-x-2">
            <Button variant="outline" size="md">
              Save
            </Button>
            <Button variant="outline" size="md">
              Share
            </Button>
          </div>
        </div>

        <p className="text-sm font-normal text-light"> {currentPalette.description}</p>
      </div>

      <div className="mb-8 space-y-6">
        {currentPalette.colors.map((c, index) => (
          <PaletteCard
            key={c.name}
            paletteId={currentPalette.id}
            index={index}
            {...c}
            primaryShade={currentPalette.primaryShade}
          />
        ))}
      </div>

      <div>
        <NewColorDialog>
          <Button className="w-full">
            <Icons.plus className="mr-2 h-4 w-4" />
            Add New Color
          </Button>
        </NewColorDialog>
      </div>
    </section>
  );
};

export default Playground;
