"use client";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Controls from "./components/Controls";
import { CanvasProvider } from "./context";
import Canvas from "./components/Canvas";

export default function Home() {
  return (
    <>
      <CanvasProvider>
        <div className="flex justify-center items-center min-h-screen">
          <Controls />
          <Canvas />
        </div>
      </CanvasProvider>
      <ToastContainer
        position="bottom-center"
        autoClose={500}
        hideProgressBar={true}
        closeButton={true}
        rtl={false}
        pauseOnFocusLoss={false}
        pauseOnHover={true}
        draggable={true}
        theme="light"      
      />
    </>
  );
}
