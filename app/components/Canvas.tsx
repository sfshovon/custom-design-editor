"use client";

import { Stage, Layer, Rect, Circle, Transformer } from "react-konva";
import Konva from "konva";
import { useCanvas } from "../context";
import { useState, useRef, useEffect } from "react";
import { Shape } from "../types";

const Canvas = () => {
  const { state, dispatch } = useCanvas();
  const [selectedShape, setSelectedShape] = useState<string | null>(null);

  const transformerRef = useRef<Konva.Transformer>(null);

  const [stageWidth, setStageWidth] = useState<number>(1200);
  const [stageHeight, setStageHeight] = useState<number>(600);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setStageWidth(600);
        setStageHeight(400);
      } else {
        setStageWidth(1200);
        setStageHeight(600);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleShape = (shape: string) => {
    setSelectedShape(shape);
  };

  const handleDragMove = (e: Konva.KonvaEventObject<DragEvent>, id: string): void => {
    const { x, y } = e.target.position();
    dispatch({ type: "UPDATE_SHAPE", id, x, y });
  };

  const handleTransform = (e: Konva.KonvaEventObject<Event>, id: string): void => {
    const node = e.target as Konva.Node;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    dispatch({
      type: "RESIZE_SHAPE",
      id,
      width: node.width() * scaleX,
      height: node.height() * scaleY,
    });
    node.scaleX(1);
    node.scaleY(1);
  };

  return (
    <div className="flex justify-center items-center">
      <Stage width={stageWidth} height={stageHeight} className="border border-black rounded-2xl">
        <Layer>
          {state.shapes.map((shape: Shape) => {
            const isSelected = shape.id === selectedShape;

            return shape.type === "rectangle" ? (
              <Rect
                key={shape.id}
                x={shape.x}
                y={shape.y}
                width={shape.width}
                height={shape.height}
                fill={shape.color}
                stroke={isSelected ? "blue" : "black"}
                strokeWidth={isSelected ? 2 : 1}
                draggable
                onClick={() => handleShape(shape.id)}
                onDragMove={(e) => handleDragMove(e, shape.id)}
                onTransformEnd={(e) => handleTransform(e, shape.id)}
                ref={(node) => {
                  if (isSelected && node) {
                    transformerRef.current?.nodes([node]);
                    transformerRef.current?.getLayer()?.batchDraw();
                  }
                }}
              />
            ) : (
              <Circle
                key={shape.id}
                x={shape.x}
                y={shape.y}
                radius={shape.width / 2}
                fill={shape.color}
                stroke={isSelected ? "blue" : "black"}
                strokeWidth={isSelected ? 2 : 1}
                draggable
                onClick={() => handleShape(shape.id)}
                onDragMove={(e) => handleDragMove(e, shape.id)}
                onTransformEnd={(e) => handleTransform(e, shape.id)}
                ref={(node) => {
                  if (isSelected && node) {
                    transformerRef.current?.nodes([node]);
                    transformerRef.current?.getLayer()?.batchDraw();
                  }
                }}
              />
            );
          })}
          <Transformer ref={transformerRef} />
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
