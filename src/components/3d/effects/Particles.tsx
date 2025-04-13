
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticlesProps {
  count?: number;
  gpuTier?: number;
}

export const Particles = ({ count = 300, gpuTier = 2 }: ParticlesProps) => {
  const pointsRef = useRef<THREE.Points>(null!);
  const particleCount = gpuTier > 1 ? count : Math.floor(count / 2);
  
  // Create particles with better distribution
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      // Distribute particles in a spherical shape
      const radius = 10 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    
    return positions;
  }, [particleCount]);
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x += 0.0002;
      pointsRef.current.rotation.y += 0.0001;
      
      // Pulse effect on particles
      const time = state.clock.elapsedTime;
      const material = pointsRef.current.material as THREE.PointsMaterial;
      material.size = 0.08 + Math.sin(time * 0.5) * 0.02;
      material.opacity = 0.6 + Math.sin(time * 0.5) * 0.2;
    }
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#9b87f5"
        transparent
        opacity={0.6}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
};

export default Particles;
