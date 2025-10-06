import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useMemo } from "react";
import { Points, BufferGeometry, Group } from "three";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const BioluminescentParticles = () => {
  const pointsRef = useRef<Points>(null);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 300; i++) {
      temp.push(
        Math.random() * 50 - 25,
        Math.random() * 50 - 25,
        Math.random() * 50 - 25
      );
    }
    return new Float32Array(temp);
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime();
      pointsRef.current.rotation.y = time * 0.02;
      
      const material = pointsRef.current.material as any;
      material.opacity = 0.6 + Math.sin(time * 2) * 0.2;
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
      <pointsMaterial size={0.3} color="#00ffff" transparent opacity={0.6} />
    </points>
  );
};

const GlowingFish = ({ position }: { position: [number, number, number] }) => {
  const fishRef = useRef<Group>(null);

  useFrame((state) => {
    if (fishRef.current) {
      const time = state.clock.getElapsedTime();
      fishRef.current.position.x = position[0] + Math.sin(time * 0.3 + position[1]) * 5;
      fishRef.current.position.z = position[2] + Math.cos(time * 0.4 + position[0]) * 3;
      fishRef.current.rotation.y = Math.sin(time * 0.3) * 0.5;
      
      const mesh = fishRef.current.children[0] as any;
      if (mesh.material) {
        mesh.material.emissiveIntensity = 1 + Math.sin(time * 3) * 0.5;
      }
    }
  });

  return (
    <group ref={fishRef} position={position}>
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial 
          color="#00ffff" 
          emissive="#00ffff" 
          emissiveIntensity={1}
          metalness={0.5}
        />
      </mesh>
      <pointLight color="#00ffff" intensity={2} distance={5} />
    </group>
  );
};

const TwilightZone = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-[#051829] to-[#020c1b]">
      <Canvas camera={{ position: [0, 0, 25], fov: 60 }}>
        <ambientLight intensity={0.15} />
        <pointLight position={[0, 10, 0]} intensity={0.3} color="#1a4d6d" />
        
        <BioluminescentParticles />
        <GlowingFish position={[8, 3, 0]} />
        <GlowingFish position={[-6, -2, 5]} />
        <GlowingFish position={[3, 5, -4]} />
        <GlowingFish position={[-8, 0, -3]} />
        
        <OrbitControls enableZoom={false} />
      </Canvas>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
        <h1 className="text-6xl font-bold text-cyan-400 drop-shadow-[0_4px_20px_rgba(0,255,255,0.5)] mb-4">
          The Twilight Zone
        </h1>
        <p className="text-2xl text-cyan-300 drop-shadow-[0_4px_20px_rgba(0,255,255,0.5)] mb-8">
          Where Bioluminescence Reigns
        </p>
        <div className="flex gap-4 pointer-events-auto">
          <Button 
            onClick={() => navigate("/ocean-floor")}
            className="bg-cyan-500/20 backdrop-blur-sm hover:bg-cyan-500/30 text-cyan-200 border-2 border-cyan-400"
            size="lg"
          >
            <ChevronUp className="mr-2" /> Up
          </Button>
          <Button 
            onClick={() => navigate("/midnight-zone")}
            className="bg-cyan-500/20 backdrop-blur-sm hover:bg-cyan-500/30 text-cyan-200 border-2 border-cyan-400"
            size="lg"
          >
            Into the Midnight <ChevronDown className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TwilightZone;
