import { createContext, useReducer, useContext } from "react";
import { ActionType, CanvasState } from "../types";

const canvasReducer = (state: CanvasState, action: ActionType): CanvasState => {
  switch (action.type) {
    case "ADD_SHAPE":
      return {
        ...state,
        shapes: [...state.shapes, action.shape],
        history: [...state.history, [...state.shapes]],
        redoStack: [],
      };

    case "UPDATE_SHAPE":
      return {
        ...state,
        shapes: state.shapes.map((shape) =>
          shape.id === action.id ? { ...shape, x: action.x, y: action.y } : shape
        ),
        history: [...state.history, [...state.shapes]],
        redoStack: [],
      };

    case "RESIZE_SHAPE":
      return {
        ...state,
        shapes: state.shapes.map((shape) =>
          shape.id === action.id ? { ...shape, width: action.width, height: action.height } : shape
        ),
        history: [...state.history, [...state.shapes]],
        redoStack: [],
      };

    case "UNDO":
      if (!state.history.length) return state;
      const prevState = state.history[state.history.length - 1];
      return {
        ...state,
        shapes: prevState,
        history: state.history.slice(0, -1),
        redoStack: [state.shapes, ...state.redoStack],
      };

    case "REDO":
      if (!state.redoStack.length) return state;
      const redoState = state.redoStack[0];
      return {
        ...state,
        shapes: redoState,
        history: [...state.history, state.shapes],
        redoStack: state.redoStack.slice(1),
      };

    case "RELOAD":
      return { ...state, shapes: action.shapes, history: [], redoStack: [] };

    case "RESET":
      return { shapes: [], history: [], redoStack: [] };

    default:
      return state;
  }
};

const CanvasContext = createContext<{ state: CanvasState; dispatch: React.Dispatch<ActionType> } | undefined>(undefined);

export const CanvasProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(canvasReducer, { shapes: [], history: [], redoStack: [] });

  return <CanvasContext.Provider value={{ state, dispatch }}>{children}</CanvasContext.Provider>;
};

export const useCanvas = () => {
  const context = useContext(CanvasContext);
  if (!context) throw new Error("Wrap useCanvas with a CanvasProvider");
  return context;
};
