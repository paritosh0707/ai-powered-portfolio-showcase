
import React, { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useSpring, animated, config } from "@react-spring/three";
import { PerspectiveCamera, OrbitControls, Environment, Stats, useDetectGPU, Float, Text3D, MeshTransmissionMaterial, RoundedBox, GradientTexture } from "@react-three/drei";
import * as THREE from "three";

// Enhanced 3D Objects for different sections
const AboutObject = () => {
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

const SkillsObject = () => {
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

const ContactObject = () => {
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

// Improved camera controller for smoother transitions
const CameraController = ({ target, section }: { target: string, section: string }) => {
  const { camera } = useThree();
  const controls = useRef<any>(null);

  const positions = {
    home: [0, 0, 7],
    about: [0, 0, 5],
    skills: [0, 1, 6],
    experience: [1, 0, 6],
    projects: [0, -1, 7],
    blog: [-1, 0, 7],
    contact: [0, 0, 5],
  };

  // Use react-spring for smoother camera animations
  const { cameraPos } = useSpring({
    cameraPos: positions[target as keyof typeof positions] || [0, 0, 7],
    config: config.molasses, // Slow, smooth transition
    onChange: ({ value }) => {
      const [x, y, z] = value.cameraPos;
      camera.position.set(x, y, z);
    },
  });

  useEffect(() => {
    if (controls.current) {
      // Only enable controls when not transitioning
      controls.current.enabled = target === '';
    }
  }, [target]);

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

// Enhanced particle system
const Particles = ({ count = 300, gpuTier = 2 }: { count?: number, gpuTier?: number }) => {
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

// Animated neural network background
const NeuralNetwork = () => {
  const linesRef = useRef<THREE.Group>(null!);
  const nodesCount = 25;
  
  // Create nodes and connections
  const nodes = useMemo(() => {
    return Array.from({ length: nodesCount }).map(() => {
      return {
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20
        ],
        connections: [] as number[]
      };
    });
  }, [nodesCount]);
  
  // Create edges (connections between nodes)
  const edges = useMemo(() => {
    const connections: [number, number][] = [];
    
    // Create a somewhat connected graph
    for (let i = 0; i < nodes.length; i++) {
      // Connect to 2-4 nearby nodes
      const connectionCount = 2 + Math.floor(Math.random() * 3);
      
      for (let j = 0; j < connectionCount; j++) {
        let target = Math.floor(Math.random() * nodes.length);
        // Avoid self connections and duplicates
        while (target === i || nodes[i].connections.includes(target)) {
          target = Math.floor(Math.random() * nodes.length);
        }
        
        nodes[i].connections.push(target);
        connections.push([i, target]);
      }
    }
    
    return connections;
  }, [nodes]);
  
  useFrame(({ clock }) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = clock.elapsedTime * 0.05;
      linesRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.1) * 0.2;
    }
  });
  
  return (
    <group ref={linesRef} position={[0, 0, -30]} scale={1.2}>
      {/* Nodes */}
      {nodes.map((node, i) => (
        <mesh key={`node-${i}`} position={node.position as [number, number, number]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#0ea5e9" transparent opacity={0.8} />
        </mesh>
      ))}
      
      {/* Connections */}
      {edges.map(([from, to], i) => {
        const fromPos = nodes[from].position as [number, number, number];
        const toPos = nodes[to].position as [number, number, number];
        
        // Calculate line geometry
        const points = [
          new THREE.Vector3(...fromPos),
          new THREE.Vector3(...toPos)
        ];
        
        return (
          <line key={`connection-${i}`}>
            <bufferGeometry attach="geometry">
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#9b87f5" opacity={0.3} transparent />
          </line>
        );
      })}
    </group>
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
      <Canvas shadows dpr={gpuTier ? [1, Math.min(gpuTier.tier, 2)] : [1, 1]}>
        {showPerformanceStats && <Stats />}
        <fog attach="fog" args={['#10131b', 20, 40]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
        <spotLight position={[-10, 10, 5]} angle={0.3} penumbra={1} intensity={0.8} castShadow />
        
        <NeuralNetwork />
        <Particles count={gpuTier && gpuTier.tier > 2 ? 500 : 200} gpuTier={gpuTier?.tier} />
        <CameraController target={currentSection} section={currentSection} />
        
        {/* Conditionally render 3D objects based on section */}
        {currentSection === 'about' && <AboutObject />}
        {currentSection === 'skills' && <SkillsObject />}
        {currentSection === 'projects' && <ProjectsObject />}
        {currentSection === 'contact' && <ContactObject />}
        
        {/* Default object for other sections */}
        {!['about', 'skills', 'projects', 'contact'].includes(currentSection) && (
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
        )}
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default Scene3D;
