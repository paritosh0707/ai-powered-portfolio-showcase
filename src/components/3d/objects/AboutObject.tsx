
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

export const AboutObject = () => {
  const group = useRef<THREE.Group>(null!);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2 + state.clock.elapsedTime * 0.15;
    }
  });

  const meshes = useMemo(() => 
    Array.from({ length: 8 }).map((_, i) => ({
      position: [
        Math.sin(i / 8 * Math.PI * 2) * 1.5,
        Math.cos(i / 8 * Math.PI * 2) * 1.5,
        0
      ],
      scale: 0.4 + Math.random() * 0.2,
      rotation: [Math.random(), Math.random(), Math.random()]
    })), []
  );

  return (
    <group ref={group} position={[0, 0, 0]}>
      <Float
        speed={3}
        rotationIntensity={0.5}
        floatIntensity={1.5}
      >
        <mesh castShadow receiveShadow>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial wireframe color="#9b87f5" />
        </mesh>

        {meshes.map((mesh, i) => (
          <mesh 
            key={i} 
            position={mesh.position as [number, number, number]} 
            scale={mesh.scale}
            rotation={mesh.rotation as [number, number, number]}
          >
            <dodecahedronGeometry args={[0.3, 0]} />
            <MeshTransmissionMaterial 
              color="#9b87f5"
              backside={true}
              resolution={256}
              thickness={0.2}
              roughness={0.1}
              ior={1.5}
              chromaticAberration={0.04}
              transmission={1}
            />
          </mesh>
        ))}
      </Float>
    </group>
  );
};

export default AboutObject;
