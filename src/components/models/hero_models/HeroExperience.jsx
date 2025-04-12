import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Suspense, useMemo } from "react";

import { Room } from "./Room";
import HeroLights from "./HeroLights";
import Particles from "./Particles";

const HeroExperience = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  // Tính toán scale và position 1 lần
  const modelProps = useMemo(() => {
    return {
      scale: isMobile ? 0.7 : 1,
      position: [0, -3.5, 0],
      rotation: [0, -Math.PI / 4, 0],
    };
  }, [isMobile]);

  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
    >
      <ambientLight intensity={0.2} color="#1a1a40" />
      
      <OrbitControls
        enablePan={false}
        enableZoom={!isTablet}
        maxDistance={20}
        minDistance={5}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
      />

      <Suspense fallback={null}>
        <HeroLights />
        <Particles count={100} />
        <group {...modelProps}>
          <Room />
        </group>
      </Suspense>
    </Canvas>
  );
};

export default HeroExperience;
