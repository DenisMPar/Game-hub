/* eslint-disable @typescript-eslint/no-explicit-any */
import { useIsMobile } from "@/hooks";
import { useGLTF } from "@react-three/drei";
import { GroupProps, useThree } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { degToRad } from "three/src/math/MathUtils.js";
type KeyVariant = "w" | "a" | "s" | "d" | "c" | "v" | "ctrl";

interface KeyProps extends GroupProps {
  variant: KeyVariant;
}
const modelDictionary = {
  w: "/w-key.glb",
  a: "/a-key.glb",
  s: "/s-key.glb",
  d: "/d-key.glb",
  c: "/c-key.glb",
  v: "/v-key.glb",
  ctrl: "/ctrl-key.glb",
};
export function KeyModel({ variant, ...props }: KeyProps) {
  const { nodes, materials }: any = useGLTF(modelDictionary[variant]);
  const keyRef = useRef<RapierRigidBody | null>(null);
  const { viewport } = useThree();
  const isMobile = useIsMobile();
  const responsiveRatio = viewport.width / 15;
  const minimumScale = 0.6;
  const responsiveValue = 0.6 * responsiveRatio;
  const mobileScale = Math.max(responsiveValue, minimumScale);

  function addImpulse() {
    if (keyRef.current) {
      const randomNumber = Math.round(Math.random());
      const applyImpulseOnXMobile = randomNumber === 1 ? 0.5 : -0.5;
      const applyImpulseOnXDesktop = randomNumber === 1 ? 1.5 : -1.5;
      const applyImpulseOnY = isMobile ? 1.5 : 5;
      const appliTorqueOnXMobile = randomNumber === 1 ? -0.1 : 0.1;
      const appliTorqueOnXDesktop = randomNumber === 1 ? -0.8 : 0.8;
      keyRef.current.applyImpulse(
        {
          x: isMobile ? applyImpulseOnXMobile : applyImpulseOnXDesktop,
          y: applyImpulseOnY,
          z: 0,
        },
        true
      );
      keyRef.current.applyTorqueImpulse(
        {
          x: 0,
          y: 0,
          z: isMobile ? appliTorqueOnXMobile : appliTorqueOnXDesktop,
        },
        true
      );
    }
  }
  return (
    <group
      onClick={addImpulse}
      {...props}
      dispose={null}
      rotation={[degToRad(90), degToRad(145), 0]}
      scale={isMobile ? mobileScale : 0.8}
    >
      <RigidBody
        ref={keyRef}
        type="dynamic"
        colliders="cuboid"
        restitution={0.3}
        gravityScale={isMobile ? 1 : 2}
      >
        <mesh geometry={nodes.Cube.geometry} material={materials.Material} />
      </RigidBody>
    </group>
  );
}

// Only preload keys shared across all devices; desktop-only keys (c, v, ctrl) load on demand
useGLTF.preload("/w-key.glb");
useGLTF.preload("/a-key.glb");
useGLTF.preload("/s-key.glb");
useGLTF.preload("/d-key.glb");
