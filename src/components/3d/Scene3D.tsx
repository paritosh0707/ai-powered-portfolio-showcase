
import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import { PerspectiveCamera, OrbitControls, Environment, Stats, useDetectGPU } from "@react-three/drei";
import * as THREE from "three";

// 3D Objects for different sections
const AboutObject = () => {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1.5, 1]} />
      <meshStandardMaterial color="#9b87f5" wireframe />
    </mesh>
  );
};

const SkillsObject = () => {
  const group = useRef<THREE.Group>(null!);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={group}>
      {[-2, -1, 0, 1, 2].map((x, i) => (
        <mesh key={i} position={[x * 1.2, Math.sin(x) * 0.5, 0]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color={i % 2 === 0 ? "#7e69ab" : "#0ea5e9"} />
        </mesh>
      ))}
    </group>
  );
};

const ProjectsObject = () => {
  const group = useRef<THREE.Group>(null!);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.003;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={group}>
      <mesh position={[-1.5, 0, 0]}>
        <torusGeometry args={[0.8, 0.2, 16, 32]} />
        <meshStandardMaterial color="#0ea5e9" />
      </mesh>
      <mesh position={[1.5, 0, 0]}>
        <torusKnotGeometry args={[0.7, 0.2, 128, 32]} />
        <meshStandardMaterial color="#9b87f5" />
      </mesh>
    </group>
  );
};

const ContactObject = () => {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.005;
      mesh.current.rotation.x += 0.002;
    }
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshStandardMaterial color="#0ea5e9" wireframe />
    </mesh>
  );
};

// Camera controller for smooth transitions
const CameraController = ({ target, section }: { target: string, section: string }) => {
  const { camera } = useThree();
  const controls = useRef<any>(null);

  const positions = {
    home: [0, 0, 7],
    about: [0, 0, 5],
    skills: [0, 0, 6],
    projects: [0, 0, 7],
    experience: [0, 0, 6],
    blog: [0, 0, 7],
    contact: [0, 0, 5],
  };

  useEffect(() => {
    if (controls.current) {
      controls.current.enabled = target === '';
    }
  }, [target]);

  useEffect(() => {
    if (target && positions[target as keyof typeof positions]) {
      const [x, y, z] = positions[target as keyof typeof positions];
      camera.position.set(x, y, z);
    }
  }, [target, camera]);

  return (
    <OrbitControls
      ref={controls}
      enableZoom={false}
      enablePan={false}
      enableRotate={target === ''}
      autoRotate={target === ''}
      autoRotateSpeed={0.5}
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={Math.PI / 3}
    />
  );
};

// Particles for background
const Particles = ({ count = 300 }: { count?: number }) => {
  const mesh = useRef<THREE.InstancedMesh>(null!);
  
  useEffect(() => {
    if (mesh.current) {
      const tempObject = new THREE.Object3D();
      
      for (let i = 0; i < count; i++) {
        const radius = 10 + Math.random() * 20;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        tempObject.position.x = radius * Math.sin(phi) * Math.cos(theta);
        tempObject.position.y = radius * Math.sin(phi) * Math.sin(theta);
        tempObject.position.z = radius * Math.cos(phi);
        
        tempObject.updateMatrix();
        mesh.current.setMatrixAt(i, tempObject.matrix);
      }
      
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  }, [count]);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.0002;
      mesh.current.rotation.y += 0.0001;
    }
  });
  
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <circleGeometry args={[0.05, 16]} />
      <meshBasicMaterial color="#9b87f5" transparent opacity={0.4} />
    </instancedMesh>
  );
};

// Main Scene component
export const Scene3D = ({ currentSection }: { currentSection: string }) => {
  const [showPerformanceStats, setShowPerformanceStats] = useState(false);
  const gpuTier = useDetectGPU();
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    // Check for WebGL support and GPU capabilities
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl || (gpuTier && gpuTier.tier < 1)) {
      setFallback(true);
    }
    
    // Toggle stats in development
    if (process.env.NODE_ENV === 'development') {
      setShowPerformanceStats(true);
    }
  }, [gpuTier]);

  if (fallback) {
    return (
      <div className="fixed inset-0 z-[-1]">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background bg-opacity-80">
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-repeat" style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[-1]">
      <Canvas shadows dpr={[1, 2]}>
        {showPerformanceStats && <Stats />}
        <fog attach="fog" args={['#10131b', 20, 40]} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <Particles count={gpuTier && gpuTier.tier > 2 ? 500 : 200} />
        <CameraController target={currentSection} section={currentSection} />
        
        {/* Conditionally render 3D objects based on section */}
        {currentSection === 'about' && <AboutObject />}
        {currentSection === 'skills' && <SkillsObject />}
        {currentSection === 'projects' && <ProjectsObject />}
        {currentSection === 'contact' && <ContactObject />}
        
        {/* Default object for other sections */}
        {!['about', 'skills', 'projects', 'contact'].includes(currentSection) && (
          <mesh>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#9b87f5" wireframe />
          </mesh>
        )}
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default Scene3D;
