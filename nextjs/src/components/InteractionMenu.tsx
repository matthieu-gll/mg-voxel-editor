"use client";

import { useGlobalStore } from "@/stores/useGlobalStore";
import clsx from "clsx";
import { Box } from "lucide-react";

export const InteractionMenu = () => {
  const { interactionMode, setInteractionMode } = useGlobalStore();

  const isAddCubeMode = interactionMode === "add-cube";

  const handleAddCubeClick = () => {
    setInteractionMode("add-cube");
  };

  return (
    <section className="p-2 rounded-xl fixed bottom-4 left-1/2 -translate-x-1/2 z-10 bg-neutral-900">
      <button
        onClick={handleAddCubeClick}
        className={clsx("ds-button", { active: isAddCubeMode })}
        title="Enable add cube mode"
      >
        <Box />
      </button>
    </section>
  );
};
