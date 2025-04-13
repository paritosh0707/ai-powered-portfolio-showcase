
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, GradientTexture } from "@react-three/drei";
import * as THREE from "three";

export const SkillsObject = () => {
  const group = useRef<THREE.Group>(null!);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.002;
      group.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          child.position.y = Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.2;
          child.rotation.x = Math.sin(state.clock.elapsedTime * 0.3 + i) * 0.2;
          child.rotation.z = Math.cos(state.clock.elapsedTime * 0.3 + i) * 0.2;
        }
      });
    }
  });

  const items = [
    { position: [-2, 0, 0], color: "#7e69ab" },
    { position: [-1, 0.5, 0.5], color: "#0ea5e9" },
    { position: [0, 0, -1], color: "#9b87f5" },
    { position: [1, -0.5, 0.5], color: "#0ea5e9" },
    { position: [2, 0, 0], color: "#7e69ab" },
  ];

  return (
    <group ref={group}>
      {items.map((item, i) => (
        <RoundedBox 
          key={i} 
          position={item.position as [number, number, number]} 
          args={[0.7, 0.7, 0.7]}
          radius={0.1}
          smoothness={4}
        >
          <meshStandardMaterial color={item.color}>
            <GradientTexture
              stops={[0, 1]}
              colors={['#8B5CF6', '#7E69AB']} 
              size={1024}
            />
          </meshStandardMaterial>
        </RoundedBox>
      ))}
    </group>
  );
};

export default SkillsObject;
