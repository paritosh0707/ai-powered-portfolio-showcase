
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

export const ProjectsObject = () => {
  const group = useRef<THREE.Group>(null!);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.003;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[-1.5, 0, 0]} castShadow>
          <torusGeometry args={[0.8, 0.2, 32, 64]} />
          <meshStandardMaterial color="#0ea5e9" metalness={0.5} roughness={0.2} />
        </mesh>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.7} floatIntensity={0.7}>
        <mesh position={[1.5, 0, 0]} castShadow>
          <torusKnotGeometry args={[0.7, 0.2, 128, 32]} />
          <meshStandardMaterial color="#9b87f5" metalness={0.3} roughness={0.3} />
        </mesh>
      </Float>
    </group>
  );
};

export default ProjectsObject;
