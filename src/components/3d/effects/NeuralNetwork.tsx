
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const NeuralNetwork = () => {
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

export default NeuralNetwork;
