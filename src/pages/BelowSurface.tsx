import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useMemo } from "react";
import { Mesh, BufferGeometry, Points } from "three";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const LightRays = () => {
  const raysRef = useRef<Mesh[]>([]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    raysRef.current.forEach((ray, i) => {
      if (ray) {
        ray.rotation.z = Math.sin(time * 0.5 + i) * 0.1;
        const material = ray.material as any;
        if (material && !Array.isArray(material)) {
          material.opacity = 0.15 + Math.sin(time + i) * 0.05;
        }
      }
    });
  });

  return (
    <group>
      {[...Array(8)].map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (raysRef.current[i] = el!)}
          position={[(i - 4) * 3, 15, -10]}
          rotation={[0, 0, 0]}
        >
          <planeGeometry args={[1, 30]} />
          <meshBasicMaterial color="#87ceeb" transparent opacity={0.2} />
        </mesh>
      ))}
    </group>
  );
};

const Bubbles = () => {
  const pointsRef = useRef<Points>(null);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 200; i++) {
      temp.push(
        Math.random() * 40 - 20,
        Math.random() * 30 - 5,
        Math.random() * 40 - 20
      );
    }
    return new Float32Array(temp);
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime();
      pointsRef.current.rotation.y = time * 0.05;
      
      const positions = (pointsRef.current.geometry as BufferGeometry).attributes.position.array as Float32Array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += 0.02;
        if (positions[i] > 25) positions[i] = -5;
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
      <pointsMaterial size={0.2} color="#ffffff" transparent opacity={0.6} />
    </points>
  );
};

const BelowSurface = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-[#4a9eff] to-[#2068c8]">
      <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[0, 10, 5]} intensity={1} color="#87ceeb" />
        <LightRays />
        <Bubbles />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#1e7acc" transparent opacity={0.3} />
        </mesh>
        <OrbitControls enableZoom={false} />
      </Canvas>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
        <h1 className="text-6xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] mb-4">
          Below the Surface
        </h1>
        <p className="text-2xl text-cyan-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] mb-8">
          Sunlight Dances Through the Water
        </p>
        <div className="flex gap-4 pointer-events-auto">
          <Button 
            onClick={() => navigate("/")}
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white"
            size="lg"
          >
            <ChevronUp className="mr-2" /> Surface
          </Button>
          <Button 
            onClick={() => navigate("/mid-ocean")}
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white"
            size="lg"
          >
            Deeper <ChevronDown className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BelowSurface;
