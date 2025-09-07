import React, { Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Text, Sphere, Ring } from "@react-three/drei";
import { Briefcase, Code, Award, GraduationCap, X, type LucideIcon } from "lucide-react";
import * as THREE from "three";

interface JourneyNode {
  id: number;
  position: [number, number, number];
  role: string;
  company: string;
  duration: string;
  achievements: string[];
  techStack: string[];
  color: string;
  icon: LucideIcon;
}

const journeyData: JourneyNode[] = [
  {
    id: 1,
    position: [-4, 2, 0],
    role: "B.Tech Student",
    company: "Woxsen University",
    duration: "2022 – 2026",
    achievements: [
      "Pursuing B.Tech in Computer Science Engineering (Core)",
      "Maintaining 69% CGPA",
      "Active participant in hackathons and technical events",
      "Building strong foundation in programming and software development"
    ],
    techStack: ["Python", "Java", "JavaScript", "Data Structures", "Algorithms"],
    color: "#3b82f6",
    icon: GraduationCap
  },
  {
    id: 2,
    position: [2, 3, -1],
    role: "Hackathon Winner",
    company: "DIGITECH Hackathon",
    duration: "March 2025",
    achievements: [
      "🥇 Ranked #1 among 50+ teams",
      "Developed Resume Ranker AI tool",
      "Implemented machine learning algorithms for resume analysis",
      "Delivered complete end-to-end solution within 48 hours"
    ],
    techStack: ["AI/ML", "Python", "NLP", "React.js"],
    color: "#8b5cf6",
    icon: Award
  },
  {
    id: 3,
    position: [-2, -1, 2],
    role: "Full Stack Developer",
    company: "Personal Projects",
    duration: "2023 – Present",
    achievements: [
      "Built 5+ comprehensive full-stack applications",
      "Specialized in AI integration and cybersecurity",
      "Reduced security vulnerabilities by 60% through automated scanning",
      "Implemented blockchain-based password management system"
    ],
    techStack: ["React.js", "Node.js", "MongoDB", "Docker", "Blockchain"],
    color: "#ec4899",
    icon: Code
  },
  {
    id: 4,
    position: [4, -2, -0.5],
    role: "Aspiring Software Engineer",
    company: "Seeking Opportunities",
    duration: "2025 – Future",
    achievements: [
      "Actively seeking internship and full-time opportunities",
      "Building professional network and industry connections",
      "Continuously learning emerging technologies",
      "Contributing to open-source projects"
    ],
    techStack: ["Machine Learning", "Cloud Computing", "DevOps", "Microservices"],
    color: "#10b981",
    icon: Briefcase
  }
];

const JourneyNode = ({ 
  node, 
  isSelected, 
  onSelect 
}: { 
  node: JourneyNode; 
  isSelected: boolean; 
  onSelect: (id: number) => void; 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = node.position[1] + Math.sin(state.clock.elapsedTime + node.id) * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x += 0.005;
      ringRef.current.rotation.z += 0.003;
    }
  });

  return (
    <group position={node.position}>
      {/* Main sphere */}
      <mesh
        ref={meshRef}
        onClick={() => onSelect(node.id)}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={isSelected ? 0.3 : 0.1}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Animated ring */}
      <mesh ref={ringRef}>
        <ringGeometry args={[0.4, 0.5, 32]} />
        <meshBasicMaterial
          color={node.color}
          transparent
          opacity={isSelected ? 0.8 : 0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Floating text label */}
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {node.role}
      </Text>

      {/* Selection indicator */}
      {isSelected && (
        <mesh>
          <ringGeometry args={[0.6, 0.7, 32]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
        </mesh>
      )}
    </group>
  );
};

const Scene = ({ 
  selectedJourney, 
  onSelectJourney 
}: { 
  selectedJourney: number | null; 
  onSelectJourney: (id: number) => void; 
}) => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#3b82f6" />

      {journeyData.map((node) => (
        <JourneyNode
          key={node.id}
          node={node}
          isSelected={selectedJourney === node.id}
          onSelect={onSelectJourney}
        />
      ))}

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.5}
        minDistance={3}
        maxDistance={15}
      />
    </>
  );
};

const InteractiveProfessionalJourney = () => {
  const [selectedJourney, setSelectedJourney] = useState<number | null>(null);

  const selectedData = journeyData.find(item => item.id === selectedJourney);

  return (
    <section id="professional-journey" className="py-20 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            My Professional Journey
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Navigate through my career milestones in 3D space
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
        </motion.div>

        {/* 3D Canvas */}
        <div className="h-96 w-full relative bg-gradient-to-br from-gray-900/50 via-blue-900/20 to-purple-900/20 rounded-2xl border border-white/10 backdrop-blur-sm overflow-hidden">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 60 }}
            style={{ background: 'transparent' }}
            gl={{ 
              antialias: true,
              alpha: true,
              preserveDrawingBuffer: true,
              powerPreference: "high-performance"
            }}
            onCreated={(state) => {
              state.gl.setClearColor(0x000000, 0);
            }}
          >
            <Suspense fallback={null}>
              <Scene 
                selectedJourney={selectedJourney} 
                onSelectJourney={setSelectedJourney} 
              />
            </Suspense>
          </Canvas>
          
          {/* Instructions */}
          <div className="absolute bottom-4 left-4 text-white/60 text-sm">
            <p>Click nodes to view details • Drag to rotate • Scroll to zoom</p>
          </div>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedJourney && selectedData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedJourney(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 backdrop-blur-sm rounded-2xl p-8 max-w-lg w-full mx-4 border border-white/10 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedJourney(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
                >
                  <X size={20} className="text-white" />
                </button>

                {/* Header */}
                <div className="flex items-center space-x-4 mb-6">
                  <div 
                    className="w-12 h-12 rounded-full p-0.5"
                    style={{ background: `linear-gradient(135deg, ${selectedData.color}, ${selectedData.color}80)` }}
                  >
                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                      <selectedData.icon size={20} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedData.role}</h3>
                    <p className="text-blue-400 font-medium">{selectedData.company}</p>
                    <p className="text-gray-400 text-sm">{selectedData.duration}</p>
                  </div>
                </div>

                {/* Achievements */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Key Achievements</h4>
                  <ul className="space-y-2">
                    {selectedData.achievements.map((achievement, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-gray-300 text-sm flex items-start"
                      >
                        <span 
                          className="w-1.5 h-1.5 rounded-full mt-2 mr-3 flex-shrink-0"
                          style={{ backgroundColor: selectedData.color }}
                        ></span>
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedData.techStack.map((tech, index) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="px-3 py-1 rounded-full text-sm text-blue-300 border"
                        style={{ 
                          backgroundColor: `${selectedData.color}20`,
                          borderColor: `${selectedData.color}50`
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default InteractiveProfessionalJourney;