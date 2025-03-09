import { create } from "zustand";
import { createInteractionSlice, InteractionSlice } from "./interactionSlice";
import { createModelSlice, ModelSlice } from "./modelSlice";
import { CameraSlice, createCameraSlice } from "./cameraSlice";

export const useGlobalStore = create<
  InteractionSlice & ModelSlice & CameraSlice
>()((...a) => ({
  ...createInteractionSlice(...a),
  ...createModelSlice(...a),
  ...createCameraSlice(...a),
}));
