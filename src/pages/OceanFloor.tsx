import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, MeshWobbleMaterial } from "@react-three/drei";
import { useRef } from "react";
import { Group } from "three";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const Coral = ({ position, color }: { position: [number, number, number]; color: string }) => {
  return (
    <mesh position={position}>
      <cylinderGeometry args={[0.2, 0.4, 2, 8]} />
      <MeshWobbleMaterial color={color} factor={0.3} speed={0.5} />
    </mesh>
  );
};

const SeaPlant = ({ position }: { position: [number, number, number] }) => {
  const plantRef = useRef<Group>(null);

  useFrame((state) => {
    if (plantRef.current) {
      const time = state.clock.getElapsedTime();
      plantRef.current.rotation.z = Math.sin(time + position[0]) * 0.2;
    }
  });

  return (
    <group ref={plantRef} position={position}>
      <mesh>
        <cylinderGeometry args={[0.1, 0.05, 3, 8]} />
        <meshStandardMaterial color="#2d7a4f" />
      </mesh>
    </group>
  );
};

const TropicalFish = ({ position, color, scale }: { position: [number, number, number]; color: string; scale: number }) => {
  const fishRef = useRef<Group>(null);

  useFrame((state) => {
    if (fishRef.current) {
      const time = state.clock.getElapsedTime();
      fishRef.current.position.x = position[0] + Math.sin(time * 0.8 + position[2]) * 4;
      fishRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.5;
      fishRef.current.rotation.y = Math.sin(time * 0.8 + position[2]) * 0.3;
    }
  });

  return (
    <group ref={fishRef} position={position} scale={scale}>
      <mesh>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[-0.3, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <coneGeometry args={[0.3, 0.5, 6]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};

const OceanFloor = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-[#0a2f4a] to-[#051829]">
      <Canvas camera={{ position: [0, 5, 20], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#6ba8d4" />
        <pointLight position={[-10, 5, -10]} intensity={0.5} color="#4a8fb5" />
        
        {/* Ocean Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
          <planeGeometry args={[100, 100, 32, 32]} />
          <meshStandardMaterial color="#1a3d52" roughness={0.9} />
        </mesh>

        {/* Corals */}
        <Coral position={[-5, -1, 2]} color="#ff6b9d" />
        <Coral position={[3, -1, -1]} color="#ffd93d" />
        <Coral position={[-2, -1, -3]} color="#ff9a56" />
        <Coral position={[6, -1, 3]} color="#a8e6cf" />
        <Coral position={[-7, -1, -2]} color="#ff8fab" />

        {/* Sea Plants */}
        <SeaPlant position={[4, -2, 0]} />
        <SeaPlant position={[-3, -2, 4]} />
        <SeaPlant position={[1, -2, -4]} />
        <SeaPlant position={[-6, -2, 1]} />
        <SeaPlant position={[7, -2, -3]} />

        {/* Tropical Fish */}
        <TropicalFish position={[0, 2, 0]} color="#ff6b6b" scale={1} />
        <TropicalFish position={[5, 1, 3]} color="#4ecdc4" scale={0.8} />
        <TropicalFish position={[-4, 3, -2]} color="#ffe66d" scale={1.2} />
        <TropicalFish position={[3, 0, -5]} color="#95e1d3" scale={0.9} />
        <TropicalFish position={[-6, 2, 4]} color="#ffa07a" scale={1.1} />

        <OrbitControls enableZoom={false} />
      </Canvas>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
        <h1 className="text-6xl font-bold text-cyan-300 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] mb-4">
          The Ocean Floor
        </h1>
        <p className="text-2xl text-cyan-200 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] mb-8">
          A Vibrant Underwater Garden
        </p>
        <div className="flex gap-4 pointer-events-auto">
          <Button 
            onClick={() => navigate("/mid-ocean")}
            className="bg-cyan-400/20 backdrop-blur-sm hover:bg-cyan-400/30 text-cyan-100 border-2 border-cyan-200"
            size="lg"
          >
            <ChevronUp className="mr-2" /> Up
          </Button>
          <Button 
            onClick={() => navigate("/twilight-zone")}
            className="bg-cyan-400/20 backdrop-blur-sm hover:bg-cyan-400/30 text-cyan-100 border-2 border-cyan-200"
            size="lg"
          >
            Into the Twilight <ChevronDown className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OceanFloor;
