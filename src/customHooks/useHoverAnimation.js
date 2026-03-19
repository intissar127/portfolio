import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
function useHoverAnimation() {
  const ref = useRef();
  let isHovered = false;

  useFrame(() => {
    if (ref.current) {
      if (isHovered) {
        ref.current.rotation.y += 0.05; // Rotate when hovered
      } else {
        ref.current.rotation.y = 0; // Reset when not hovered
      }
    }
  });

  return {
    ref,
    onPointerOver: () => (isHovered = true),
    onPointerOut: () => (isHovered = false),
  };
}
export default useHoverAnimation;
