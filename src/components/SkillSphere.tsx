
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { Group, Mesh } from "three";

const FloatingSphere = ({ position, text, color }: { position: [number, number, number], text: string, color: string }) => {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color={color} wireframe />
      </mesh>
      <Text
        position={[0, -0.5, 0]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  );
};

const SkillSphere = () => {
  const skills = [
    { text: "React", position: [0, 0, 0] as [number, number, number], color: "#61dafb" },
    { text: "JavaScript", position: [-1.5, 0.5, 0] as [number, number, number], color: "#f7df1e" },
    { text: "Java", position: [1.5, -0.5, 0] as [number, number, number], color: "#ed8b00" },
    { text: "Python", position: [0, 1.5, 0] as [number, number, number], color: "#3776ab" },
    { text: "Node.js", position: [0, -1.5, 0] as [number, number, number], color: "#339933" },
  ];

  return (
    <div className="w-80 h-80">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {skills.map((skill, index) => (
          <FloatingSphere
            key={index}
            position={skill.position}
            text={skill.text}
            color={skill.color}
          />
        ))}
      </Canvas>
    </div>
  );
};

export default SkillSphere;
