import { ModelComposite, ModelConfiguration } from "@/types";
import { StateCreator } from "zustand";

export interface ModelSlice {
  modelConfiguration: ModelConfiguration;
  modelAddComposite: (modelComposite: ModelComposite) => void;
  modelRemoveComposite: (compositeIndex: number) => void;
}

export const createModelSlice: StateCreator<ModelSlice, [], [], ModelSlice> = (
  set
) => ({
  modelConfiguration: {
    composition: [],
  },

  modelAddComposite: (modelComposite) => {
    set((state) => ({
      modelConfiguration: {
        ...state.modelConfiguration,
        composition: [...state.modelConfiguration.composition, modelComposite],
      },
    }));
  },

  modelRemoveComposite: (compositeIndex) => {
    set((state) => ({
      modelConfiguration: {
        ...state.modelConfiguration,
        composition: state.modelConfiguration.composition.filter(
          (_, index) => index !== compositeIndex
        ),
      },
    }));
  },
});
