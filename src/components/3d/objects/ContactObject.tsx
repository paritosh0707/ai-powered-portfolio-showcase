
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

export const ContactObject = () => {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.005;
      mesh.current.rotation.x += 0.002;
    }
  });

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={mesh} castShadow>
        <sphereGeometry args={[1.2, 64, 64]} />
        <MeshTransmissionMaterial 
          color="#0ea5e9"
          resolution={256}
          thickness={0.1}
          roughness={0}
          ior={1.5}
          chromaticAberration={0.06}
          transmission={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          attenuationDistance={0.5}
          attenuationColor="#ffffff"
        />
      </mesh>
    </Float>
  );
};

export default ContactObject;
