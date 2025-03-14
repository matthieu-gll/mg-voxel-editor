import { InteractionModes } from "@/types";
import { StateCreator } from "zustand";

export interface InteractionSlice {
  interactionMode: InteractionModes;
  setInteractionMode: (mode: InteractionModes) => void;
}

export const createInteractionSlice: StateCreator<
  InteractionSlice,
  [],
  [],
  InteractionSlice
> = (set) => ({
  interactionMode: "nothing",
  setInteractionMode: (mode) => set({ interactionMode: mode }),
});
