
export type Shape = {
    id: string;
    type: "rectangle" | "circle";
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
  };
  
  export type CanvasState = {
    shapes: Shape[];
    history: Shape[][];
    redoStack: Shape[][];
  };
  
  export type ActionType =
    | { type: "ADD_SHAPE"; shape: Shape }
    | { type: "UPDATE_SHAPE"; id: string; x: number; y: number }
    | { type: "RESIZE_SHAPE"; id: string; width: number; height: number }
    | { type: "UNDO" }
    | { type: "REDO" }
    | { type: "RELOAD"; shapes: Shape[] }
    | { type: "RESET" };
  