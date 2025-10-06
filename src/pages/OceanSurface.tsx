import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky, Environment } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const OceanWaves = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      const geometry = meshRef.current.geometry;
      const positionAttribute = geometry.attributes.position;

      for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i);
        const y = positionAttribute.getY(i);
        const waveHeight = Math.sin(x * 0.5 + time) * 0.3 + Math.cos(y * 0.5 + time * 0.8) * 0.2;
        positionAttribute.setZ(i, waveHeight);
      }
      positionAttribute.needsUpdate = true;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[100, 100, 64, 64]} />
      <meshStandardMaterial color="#1e90ff" transparent opacity={0.8} metalness={0.3} roughness={0.1} />
    </mesh>
  );
};

const OceanSurface = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Canvas camera={{ position: [0, 5, 15], fov: 60 }}>
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <OceanWaves />
        <Environment preset="sunset" />
        <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 4} />
      </Canvas>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
        <h1 className="text-6xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] mb-4">
          Ocean Surface
        </h1>
        <p className="text-2xl text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] mb-8">
          Where Sky Meets Sea
        </p>
        <Button 
          onClick={() => navigate("/below-surface")}
          className="pointer-events-auto bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white"
          size="lg"
        >
          Dive Deeper <ChevronDown className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default OceanSurface;
