import { CameraModes } from "@/types";
import { StateCreator } from "zustand";

export interface CameraSlice {
  cameraMode: CameraModes;
  setCameraMode: (mode: CameraModes) => void;
}

export const createCameraSlice: StateCreator<
  CameraSlice,
  [],
  [],
  CameraSlice
> = (set) => ({
  cameraMode: "free",
  setCameraMode: (mode) => set({ cameraMode: mode }),
});
