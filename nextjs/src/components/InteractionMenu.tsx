"use client";

import { useGlobalStore } from "@/stores/useGlobalStore";
import clsx from "clsx";
import { Box, Minus, MousePointer2, Palette, Plus, Video } from "lucide-react";

export const InteractionMenu = () => {
  const { interactionMode, setInteractionMode, cameraMode, setCameraMode } =
    useGlobalStore();

  const toggleAddCube = () => {
    if (interactionMode === "add-cube") {
      return setInteractionMode("nothing");
    }
    setInteractionMode("add-cube");
  };

  const toggleRemoveCube = () => {
    if (interactionMode === "remove-cube") {
      return setInteractionMode("nothing");
    }
    setInteractionMode("remove-cube");
  };

  const toggleCamera = () => {
    if (cameraMode === "free") {
      return setCameraMode("blocked");
    }
    setCameraMode("free");
  };

  const toggleSelectCube = () => {
    if (interactionMode === "select-cube") {
      return setInteractionMode("nothing");
    }
    setInteractionMode("select-cube");
  };
  return (
    <section className="fixed bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-4">
      <div className="p-2 rounded-xl bg-neutral-900 flex gap-2">
        <button
          onClick={toggleSelectCube}
          className={clsx("ds-button relative", {
            active: interactionMode === "select-cube",
          })}
          title="Toggle select interaction mode"
        >
          <MousePointer2 />
        </button>
        <button
          onClick={toggleAddCube}
          className={clsx("ds-button relative", {
            active: interactionMode === "add-cube",
          })}
          title="Toggle add-cube interaction mode"
        >
          <Box />
          <Plus className="size-3 absolute top-0 right-0 text-green-300" />
        </button>
        <button
          onClick={toggleRemoveCube}
          className={clsx("ds-button relative", {
            active: interactionMode === "remove-cube",
          })}
          title="Toggle add-cube interaction mode"
        >
          <Box />
          <Minus className="size-3 absolute top-0 right-0 text-red-300" />
        </button>
      </div>
      <div className="p-2 rounded-xl bg-neutral-900 flex gap-2">
        <button
          onClick={toggleCamera}
          className={clsx("ds-button", {
            enable: cameraMode === "free",
            disable: cameraMode === "blocked",
          })}
          title="Toggle camera controls"
        >
          <Video />
        </button>
        <button
          // onClick={toggleCamera}
          className={clsx("ds-button")}
          title="Toggle colors controls"
        >
          <Palette />
        </button>
      </div>
    </section>
  );
};
