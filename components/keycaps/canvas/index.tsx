"use client";
import { Canvas } from "@react-three/fiber";
import { Scene } from "../scene";

export function KeyCapsCanvas() {
  return (
    <Canvas
      orthographic
      camera={{
        position: [0, 0, 5],
        zoom: 30,
      }}
    >
      <Scene />
    </Canvas>
  );
}
