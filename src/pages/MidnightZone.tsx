import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useMemo } from "react";
import { Points, BufferGeometry, Group } from "three";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const RareParticles = () => {
  const pointsRef = useRef<Points>(null);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 150; i++) {
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
      pointsRef.current.rotation.y = time * 0.01;
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
      <pointsMaterial size={0.15} color="#4a90e2" transparent opacity={0.3} />
    </points>
  );
};

const DeepSeaCreature = ({ position, color }: { position: [number, number, number]; color: string }) => {
  const creatureRef = useRef<Group>(null);

  useFrame((state) => {
    if (creatureRef.current) {
      const time = state.clock.getElapsedTime();
      creatureRef.current.position.x = position[0] + Math.sin(time * 0.2 + position[2]) * 4;
      creatureRef.current.position.y = position[1] + Math.cos(time * 0.15) * 2;
      creatureRef.current.rotation.z = Math.sin(time * 0.3) * 0.3;
      
      const mesh = creatureRef.current.children[0] as any;
      if (mesh.material) {
        mesh.material.emissiveIntensity = 0.8 + Math.sin(time * 2) * 0.4;
      }
    }
  });

  return (
    <group ref={creatureRef} position={position}>
      <mesh>
        <octahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          transparent
          opacity={0.7}
        />
      </mesh>
      <pointLight color={color} intensity={1.5} distance={8} />
    </group>
  );
};

const MidnightZone = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-[#020c1b] to-[#000000]">
      <Canvas camera={{ position: [0, 0, 25], fov: 60 }}>
        <ambientLight intensity={0.05} />
        
        <RareParticles />
        <DeepSeaCreature position={[10, 2, 0]} color="#ff00ff" />
        <DeepSeaCreature position={[-8, -3, 5]} color="#00ff88" />
        <DeepSeaCreature position={[5, 5, -4]} color="#ffaa00" />
        
        <OrbitControls enableZoom={false} />
      </Canvas>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
        <h1 className="text-6xl font-bold text-purple-300 drop-shadow-[0_4px_24px_rgba(255,0,255,0.6)] mb-4">
          The Midnight Zone
        </h1>
        <p className="text-2xl text-purple-200 drop-shadow-[0_4px_24px_rgba(255,0,255,0.6)] mb-8">
          Where Strange Creatures Glow
        </p>
        <div className="flex gap-4 pointer-events-auto">
          <Button 
            onClick={() => navigate("/twilight-zone")}
            className="bg-purple-500/20 backdrop-blur-sm hover:bg-purple-500/30 text-purple-200 border-2 border-purple-400"
            size="lg"
          >
            <ChevronUp className="mr-2" /> Up
          </Button>
          <Button 
            onClick={() => navigate("/abyss")}
            className="bg-purple-500/20 backdrop-blur-sm hover:bg-purple-500/30 text-purple-200 border-2 border-purple-400"
            size="lg"
          >
            Into the Abyss <ChevronDown className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MidnightZone;
