import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useMemo } from "react";
import { Points, BufferGeometry } from "three";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const FloatingParticles = () => {
  const pointsRef = useRef<Points>(null);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 500; i++) {
      temp.push(
        Math.random() * 60 - 30,
        Math.random() * 60 - 30,
        Math.random() * 60 - 30
      );
    }
    return new Float32Array(temp);
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime();
      pointsRef.current.rotation.y = time * 0.03;
      
      const positions = (pointsRef.current.geometry as BufferGeometry).attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += Math.sin(time + i) * 0.001;
        positions[i + 1] += Math.cos(time + i) * 0.001;
      }
      (pointsRef.current.geometry as BufferGeometry).attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.15} color="#6eb5ff" transparent opacity={0.4} />
    </points>
  );
};

const SwimmingFish = ({ position, color }: { position: [number, number, number]; color: string }) => {
  const fishRef = useRef<any>(null);

  useFrame((state) => {
    if (fishRef.current) {
      const time = state.clock.getElapsedTime();
      fishRef.current.position.x = position[0] + Math.sin(time * 0.5) * 3;
      fishRef.current.position.y = position[1] + Math.cos(time * 0.3) * 1;
      fishRef.current.rotation.y = Math.sin(time * 0.5) * 0.5;
    }
  });

  return (
    <group ref={fishRef} position={position}>
      <mesh>
        <coneGeometry args={[0.3, 1, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.3, 0, 0]}>
        <coneGeometry args={[0.2, 0.5, 6]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};

const MidOcean = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-[#1a5a8a] to-[#0d3d5c]">
      <Canvas camera={{ position: [0, 0, 25], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[0, 10, 5]} intensity={0.5} color="#4a8fb5" />
        <FloatingParticles />
        <SwimmingFish position={[5, 2, 0]} color="#ff6b6b" />
        <SwimmingFish position={[-8, -3, 5]} color="#4ecdc4" />
        <SwimmingFish position={[3, -5, -3]} color="#ffe66d" />
        <SwimmingFish position={[-5, 4, -5]} color="#95e1d3" />
        <OrbitControls enableZoom={false} />
      </Canvas>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
        <h1 className="text-6xl font-bold text-cyan-200 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] mb-4">
          Mid Ocean Depths
        </h1>
        <p className="text-2xl text-cyan-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] mb-8">
          Where Light Begins to Fade
        </p>
        <div className="flex gap-4 pointer-events-auto">
          <Button 
            onClick={() => navigate("/below-surface")}
            className="bg-cyan-500/20 backdrop-blur-sm hover:bg-cyan-500/30 text-cyan-100 border-2 border-cyan-300"
            size="lg"
          >
            <ChevronUp className="mr-2" /> Up
          </Button>
          <Button 
            onClick={() => navigate("/ocean-floor")}
            className="bg-cyan-500/20 backdrop-blur-sm hover:bg-cyan-500/30 text-cyan-100 border-2 border-cyan-300"
            size="lg"
          >
            Deeper <ChevronDown className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MidOcean;
