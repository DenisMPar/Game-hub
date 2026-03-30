import { useIsMobile } from "@/hooks";
import { useThree } from "@react-three/fiber";
import { CuboidCollider } from "@react-three/rapier";

export function CollidersScene() {
  const { viewport } = useThree();
  const isMobile = useIsMobile();
  const responsiveRatio = viewport.width / 15;
  const minFrontColliderPosition = 0.9;
  const frontColliderMobilePosition = Math.max(
    0.9 + responsiveRatio * 0.1,
    minFrontColliderPosition
  );
  const minSidesColliderPosition = 3;
  const sideCollidersMobilePosition = Math.max(
    3.5 + responsiveRatio * 0.1,
    minSidesColliderPosition
  );
  return (
    <>
      {/* back Collider */}
      <CuboidCollider args={[8, 3, 0.3]} position={[0, 2, 0]}>
        <meshBasicMaterial color="#000" />
      </CuboidCollider>
      {/* front collider */}
      <CuboidCollider
        args={[8, 3, 0.3]}
        position={[0, 2, isMobile ? frontColliderMobilePosition : 1]}
      />
      {/* top collider */}
      <CuboidCollider args={[3.9, 0.5, 0.3]} position={[0, 5.5, 0.4]} />
      {/* bottom collider */}
      <CuboidCollider args={[8, 0.5, 8]} position={[0, -1.5, 0.4]} />
      {/* left collider */}
      <CuboidCollider
        args={[0.5, 3, 0.3]}
        position={[isMobile ? -sideCollidersMobilePosition : -7, 2, 0.4]}
      />
      {/* right collider */}
      <CuboidCollider
        args={[0.5, 3, 0.3]}
        position={[isMobile ? sideCollidersMobilePosition : 7, 2, 0.4]}
      />
    </>
  );
}
