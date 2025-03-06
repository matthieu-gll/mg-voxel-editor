import { create } from "zustand";
import { createInteractionSlice, InteractionSlice } from "./interactionSlice";

export const useGlobalStore = create<InteractionSlice>()((...a) => ({
  ...createInteractionSlice(...a),
}));
