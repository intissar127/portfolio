import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Trail, Sphere, Line } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import PropTypes from "prop-types";

const ColorProp = PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(THREE.Color)]);

/**
 * Optimized Electron Component
 */
const Electron = ({ points, speed, themeColors }) => {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    const t = (state.clock.getElapsedTime() * speed) % 1;
    const positionIndex = Math.floor(t * points.length);
    const nextIndex = (positionIndex + 1) % points.length;

    ref.current.position.lerpVectors(
      points[positionIndex],
      points[nextIndex],
      (t * points.length) % 1
    );
  });

  return (
    <Trail
      width={4}
      length={1.5}
      color={themeColors.trailColor}
      attenuation={(t) => t * t}
    >
      <mesh ref={ref}>
        <sphereGeometry args={[0.1, 16, 16]} />
        {/* eslint-disable-next-line react/no-unknown-property */}
        <meshBasicMaterial color={themeColors.electronColor} toneMapped={false} />
      </mesh>
    </Trail>
  );
};

Electron.propTypes = {
  points: PropTypes.arrayOf(PropTypes.instanceOf(THREE.Vector3)).isRequired,
  speed: PropTypes.number.isRequired,
  themeColors: PropTypes.shape({
    electronColor: ColorProp.isRequired,
    trailColor: ColorProp.isRequired,
  }).isRequired,
};

/**
 * Nucleus and Orbits
 */
const Atom = ({ themeColors, scale }) => {
  const points = useMemo(() =>
    new THREE.EllipseCurve(0, 0, 3, 1.5, 0, 2 * Math.PI, false, 0)
      .getPoints(100)
      .map((p) => new THREE.Vector3(p.x, p.y, 0)),
  []);

  const orbitRotations = [
    [0, 0, 0],
    [Math.PI / 2, Math.PI / 4, 0],
    [Math.PI / 4, -Math.PI / 4, 0],
  ];

  return (
    <group scale={scale}>
      <Sphere args={[0.4, 32, 32]}>
        {/* eslint-disable-next-line react/no-unknown-property */}
        <meshBasicMaterial color={themeColors.atomColor} toneMapped={false} />
      </Sphere>

      {orbitRotations.map((rotation, i) => (
        <group key={i} rotation={rotation}>
          <Line points={points} color="white" opacity={0.1} transparent lineWidth={0.5} />
          <Electron
            speed={0.4 + i * 0.15}
            points={points}
            themeColors={themeColors}
          />
        </group>
      ))}
    </group>
  );
};

Atom.propTypes = {
  scale: PropTypes.number.isRequired,
  themeColors: PropTypes.shape({
    atomColor: ColorProp.isRequired,
    electronColor: ColorProp.isRequired,
    trailColor: ColorProp.isRequired,
  }).isRequired,
};

/**
 * Main Canvas Component
 */
export default function HomeCanvas({ themeColors }) {
  const [responsive, setResponsive] = useState({ scale: 1, cameraZ: 8 });

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setResponsive({
        scale: isMobile ? 0.6 : 1,
        cameraZ: isMobile ? 10 : 8,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, responsive.cameraZ], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
        <Atom themeColors={themeColors} scale={responsive.scale} />
      </Float>

      <Stars 
        radius={100} 
        depth={50} 
        count={typeof window !== "undefined" && window.innerWidth < 768 ? 2000 : 5000} 
        factor={4} 
        saturation={0} 
        fade 
      />

      <EffectComposer disableNormalPass>
        <Bloom 
          mipmapBlur 
          luminanceThreshold={0.8} 
          intensity={1.2} 
          radius={0.3} 
        />
      </EffectComposer>
    </Canvas>
  );
}

HomeCanvas.propTypes = {
  themeColors: PropTypes.shape({
    background: PropTypes.string,
    atomColor: ColorProp.isRequired,
    electronColor: ColorProp.isRequired,
    trailColor: ColorProp.isRequired,
  }).isRequired,
};