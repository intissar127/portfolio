// ReactLogo.jsx
import useHoverAnimation from "../custom hooks/useHoverAnimation";

export default function ReactLogo() {
  const { ref, onPointerOver, onPointerOut } = useHoverAnimation();

  return (
    <group>
      {/* Central Sphere */}
      <mesh ref={ref} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#61dafb" />
      </mesh>

      {/* Three Ellipses — properly rotated 120° apart */}
      {[0, 120, 240].map((angle, index) => (
        <mesh key={index} rotation={[0, 0, (angle * Math.PI) / 180]}>
          <torusGeometry args={[1, 0.05, 16, 100]} />
          <meshStandardMaterial color="#61dafb" />
        </mesh>
      ))}
    </group>
  );
}