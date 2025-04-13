
import React from "react";
import { Float } from "@react-three/drei";

export const DefaultObject = () => {
  return (
    <Float
      speed={1.5}
      rotationIntensity={0.6}
      floatIntensity={0.6}
    >
      <mesh>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial 
          color="#9b87f5" 
          wireframe 
          emissive="#9b87f5"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
};

export default DefaultObject;
