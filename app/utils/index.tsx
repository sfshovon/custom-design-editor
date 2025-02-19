import { Dispatch } from "react";
import { toast } from "react-toastify";
import { ActionType, CanvasState, Shape } from "../types";

export const toastMessage = (
  message = "Something went wrong, please try again!",
  type = "success"
) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    default:
      toast(message);
  }
};

const getBangladeshTime = () => {
  const currentDate = new Date();

  const formattedDate = currentDate
    .toLocaleString("en-GB", {
      timeZone: "Asia/Dhaka",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .reverse()
    .join("-");

  const formattedTime = currentDate
    .toLocaleString("en-GB", {
      timeZone: "Asia/Dhaka",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    .replace(/:/g, "-");

  return { formattedDate, formattedTime };
};

export const addShape = (
  dispatch: Dispatch<ActionType>,
  type: "rectangle" | "circle"
) => {
  const shape: Shape = {
    id: crypto.randomUUID(),
    type,
    x: 100,
    y: 100,
    width: 120,
    height: 120,
    color: type === "rectangle" ? "#92c7e8ea" : "#c73535ea",
  };

  dispatch({
    type: "ADD_SHAPE",
    shape,
  });
};

export const saveDesign = (state: CanvasState) => {
  if (state.shapes.length === 0) {
    toastMessage("Nothing to save!", "error");
    return;
  }
  localStorage.setItem("canvas", JSON.stringify(state.shapes));
  toastMessage("Design has been saved successfully!");
};

export const loadDesign = (dispatch: Dispatch<ActionType>) => {
  const saved = localStorage.getItem("canvas");
  if (saved) {
    try {
      dispatch({ type: "RELOAD", shapes: JSON.parse(saved) });
      toastMessage("Design has been loaded successfully!");
    } catch (error) {
      toastMessage("Error loading design!", "error");
    }
  } else {
    toastMessage("No saved design found!", "error");
  }
};

export const downloadDesign = (state: CanvasState) => {
  const canvas = document.querySelector("canvas");
  if (!canvas) {
    toastMessage("No canvas found!", "error");
    return;
  }

  if (state.shapes.length === 0) {
    toastMessage("No design to download!", "error");
    return;
  }

  const { formattedDate, formattedTime } = getBangladeshTime();
  const filename = `${"canvas"}-${formattedDate}_${formattedTime}.png`;

  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = filename;
  link.click();
  toastMessage("Design has been downloaded successfully!");
};

export const clearDesign = (dispatch: Dispatch<ActionType>, state: CanvasState) => {
  if (state.shapes.length === 0) {
    toastMessage("Nothing to clear!", "error");
    return;
  }
  dispatch({ type: "RESET" });
  toastMessage("Design has been cleared!");
};
