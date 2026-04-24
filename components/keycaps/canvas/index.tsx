"use client";
import { Canvas } from "@react-three/fiber";
import { Scene } from "../scene";

interface KeyCapsCanvasProps {
  onReady?: () => void;
}

export function KeyCapsCanvas({ onReady }: KeyCapsCanvasProps) {
  return (
    <Canvas
      orthographic
      camera={{
        position: [0, 0, 5],
        zoom: 30,
      }}
      onCreated={onReady}
    >
      <Scene />
    </Canvas>
  );
}
