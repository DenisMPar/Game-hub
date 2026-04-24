import { useIsMobile, useResizeDetection } from "@/hooks";
import { useThree } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { useEffect } from "react";
import { KeyModel } from "../model/key";
import { CollidersScene } from "./colliders";
import { Lights } from "./lights";

export function Scene() {
  const { camera } = useThree();
  const { isResizing } = useResizeDetection();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) {
      camera.position.set(0, 0, 5);
    }
  }, [isMobile, camera]);

  return (
    <>
      <Lights />
      <Physics>
        <CollidersScene />
        {isMobile && !isResizing && (
          <>
            <KeyModel variant="a" position={[-1, 2, 0]} />
            <KeyModel variant="s" position={[0, 1.8, 0]} />
            <KeyModel variant="w" position={[0, 3, 0]} />
            <KeyModel variant="d" position={[1.1, 4, 0]} />
          </>
        )}
        {!isMobile && !isResizing && (
          <>
            <KeyModel variant="a" position={[-1, 2, 0]} />
            <KeyModel variant="s" position={[0, 1.8, 0]} />
            <KeyModel variant="w" position={[0, 3, 0]} />
            <KeyModel variant="d" position={[1.1, 4, 0]} />
            <KeyModel variant="c" position={[-1.5, 3, 0]} />
            <KeyModel variant="v" position={[2, 1, 0]} />
            <KeyModel variant="ctrl" position={[2.5, 3, 0]} />
          </>
        )}
      </Physics>
    </>
  );
}
