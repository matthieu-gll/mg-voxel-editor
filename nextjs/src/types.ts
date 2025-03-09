export type InteractionModes = "nothing" | "add-cube" | "remove-cube" | "select-cube";

export type CameraModes = "free" | "blocked";

export type Position3D = [number, number, number];

export type ModelComposite = { color: string; position: Position3D };

export type ModelConfiguration = {
  composition: ModelComposite[];
};
