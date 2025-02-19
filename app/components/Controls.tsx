import {
  FiSave,
  FiFolder,
  FiSquare,
  FiCircle,
  FiTrash2,
  FiRotateCw,
  FiRotateCcw,
  FiDownload,
} from "react-icons/fi";
import { useCanvas } from "../context";
import { addShape, saveDesign, loadDesign, downloadDesign, clearDesign } from "../utils";

const Controls = () => {
  const { state, dispatch } = useCanvas();

  return (
    <div className="fixed md:left-4 md:top-1/4 top-5 flex md:flex-col gap-3 p-3 shadow-lg rounded-lg">
      {[ 
        { icon: <FiSquare size={24} />, action: () => addShape(dispatch, "rectangle"), tooltip: "Add Rectangle", color: "bg-green-500 hover:bg-green-600" },
        { icon: <FiCircle size={24} />, action: () => addShape(dispatch, "circle"), tooltip: "Add Circle", color: "bg-purple-500 hover:bg-purple-600" },
        { icon: <FiSave size={24} />, action: () => saveDesign(state), tooltip: "Save Design", color: "bg-blue-500 hover:bg-blue-600" },
        { icon: <FiFolder size={24} />, action: () => loadDesign(dispatch), tooltip: "Reload Design", color: "bg-yellow-500 hover:bg-yellow-600" },
        { icon: <FiTrash2 size={24} />, action: () => clearDesign(dispatch, state), tooltip: "Clear Design", color: "bg-red-500 hover:bg-red-600" },
        { icon: <FiRotateCcw size={24} />, action: () => dispatch({ type: "UNDO" }), tooltip: "Undo", color: "bg-gray-500 hover:bg-gray-600" },
        { icon: <FiRotateCw size={24} />, action: () => dispatch({ type: "REDO" }), tooltip: "Redo", color: "bg-gray-500 hover:bg-gray-600" },
        { icon: <FiDownload size={24} />, action: () => downloadDesign(state), tooltip: "Download Design", color: "bg-teal-500 hover:bg-teal-600" },
      ].map(({ icon, action, tooltip, color }, index) => (
        <div key={index} className="relative group">
          <button
            className={`p-2 ${color} text-white rounded-lg focus:outline-none`}
            onClick={action}
          >
            {icon}
          </button>
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 sm:bottom-auto sm:top-full md:left-full md:ml-8 mt-2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded px-2 py-1 transition-opacity duration-200">
            {tooltip}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Controls;
