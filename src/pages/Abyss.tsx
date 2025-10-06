import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useMemo } from "react";
import { Points, BufferGeometry, Group } from "three";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronUp, Home } from "lucide-react";

const MinimalParticles = () => {
  const pointsRef = useRef<Points>(null);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 80; i++) {
      temp.push(
        Math.random() * 70 - 35,
        Math.random() * 70 - 35,
        Math.random() * 70 - 35
      );
    }
    return new Float32Array(temp);
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime();
      pointsRef.current.rotation.y = time * 0.005;
      
      const material = pointsRef.current.material as any;
      material.opacity = 0.1 + Math.sin(time) * 0.05;
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
      <pointsMaterial size={0.2} color="#1a1a2e" transparent opacity={0.15} />
    </points>
  );
};

const AbyssalCreature = ({ position }: { position: [number, number, number] }) => {
  const creatureRef = useRef<Group>(null);

  useFrame((state) => {
    if (creatureRef.current) {
      const time = state.clock.getElapsedTime();
      creatureRef.current.position.x = position[0] + Math.sin(time * 0.1) * 3;
      creatureRef.current.position.y = position[1] + Math.sin(time * 0.08) * 2;
      creatureRef.current.rotation.y = time * 0.1;
      
      const mesh = creatureRef.current.children[0] as any;
      if (mesh.material) {
        mesh.material.emissiveIntensity = 0.3 + Math.sin(time * 1.5) * 0.2;
      }
    }
  });

  return (
    <group ref={creatureRef} position={position}>
      <mesh>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial 
          color="#0a4d68"
          emissive="#0a4d68"
          emissiveIntensity={0.3}
          transparent
          opacity={0.5}
          wireframe
        />
      </mesh>
      <pointLight color="#0a4d68" intensity={0.8} distance={10} />
    </group>
  );
};

const Abyss = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <Canvas camera={{ position: [0, 0, 30], fov: 60 }}>
        <ambientLight intensity={0.02} />
        
        <MinimalParticles />
        <AbyssalCreature position={[12, 0, 0]} />
        <AbyssalCreature position={[-12, 5, -5]} />
        
        <OrbitControls enableZoom={false} />
      </Canvas>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
        <h1 className="text-6xl font-bold text-gray-400 drop-shadow-[0_4px_24px_rgba(10,77,104,0.8)] mb-4 animate-pulse">
          The Abyss
        </h1>
        <p className="text-2xl text-gray-500 drop-shadow-[0_4px_24px_rgba(10,77,104,0.8)] mb-8">
          The Deepest, Darkest Realm
        </p>
        <div className="flex gap-4 pointer-events-auto">
          <Button 
            onClick={() => navigate("/midnight-zone")}
            className="bg-gray-800/40 backdrop-blur-sm hover:bg-gray-700/40 text-gray-300 border-2 border-gray-600"
            size="lg"
          >
            <ChevronUp className="mr-2" /> Up
          </Button>
          <Button 
            onClick={() => navigate("/")}
            className="bg-gray-800/40 backdrop-blur-sm hover:bg-gray-700/40 text-gray-300 border-2 border-gray-600"
            size="lg"
          >
            <Home className="mr-2" /> Back to Surface
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Abyss;
