// Cube3d.jsx
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import PropTypes from "prop-types";

export default function Cube3d({ mouse }) {
  const meshRef = useRef();

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.position.x = mouse.x * 2;
    meshRef.current.position.y = mouse.y * 2;
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef} scale={[4, 4, 4]}>
      <boxGeometry />
      <meshStandardMaterial color="#4b98c5" />
      {/* Only front face text — back is never readable while spinning */}
      <Text
        position={[0, 0.3, 0.5]}
        fontSize={0.1}
        color="#a6bad5"
        anchorX="center"
        anchorY="middle"
      >
        What I am learning
      </Text>
      <Text
        position={[0, 0.1, 0.5]}
        fontSize={0.1}
        color="#a1b0c6"
        anchorX="center"
        anchorY="middle"
      >
        NOW: NodeJS
      </Text>
    </mesh>
  );
}

Cube3d.propTypes = {
  mouse: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};