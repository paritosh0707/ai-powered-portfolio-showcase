
import React, { useState, useEffect, Suspense, lazy } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Stats, useDetectGPU } from "@react-three/drei";
import { ErrorBoundary } from "react-error-boundary";

// Import controllers
import CameraController from "./controllers/CameraController";

// Lazy-load effects for better performance
const Particles = lazy(() => import("./effects/Particles"));
const NeuralNetwork = lazy(() => import("./effects/NeuralNetwork"));

// Lazy-load 3D objects
const AboutObject = lazy(() => import("./objects/AboutObject"));
const SkillsObject = lazy(() => import("./objects/SkillsObject"));
const ProjectsObject = lazy(() => import("./objects/ProjectsObject"));
const ContactObject = lazy(() => import("./objects/ContactObject"));
const DefaultObject = lazy(() => import("./objects/DefaultObject"));

// Fallback component when 3D objects fail to load
const FallbackObject = () => {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#9b87f5" />
    </mesh>
  );
};

// Error fallback component
const ErrorFallback = () => {
  return (
    <group>
      <ambientLight intensity={0.5} />
      <FallbackObject />
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

  // Render component based on current section
  const renderSectionObject = () => {
    switch (currentSection) {
      case 'about':
        return <AboutObject />;
      case 'skills':
        return <SkillsObject />;
      case 'projects':
        return <ProjectsObject />;
      case 'contact':
        return <ContactObject />;
      default:
        return <DefaultObject />;
    }
  };

  return (
    <div className="fixed inset-0 z-[-1]">
      <ErrorBoundary FallbackComponent={() => <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-background to-background/80" />}>
        <Canvas shadows dpr={gpuTier ? [1, Math.min(gpuTier.tier, 2)] : [1, 1]}>
          {showPerformanceStats && <Stats />}
          <fog attach="fog" args={['#10131b', 20, 40]} />
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
          <spotLight position={[-10, 10, 5]} angle={0.3} penumbra={1} intensity={0.8} castShadow />
          
          <Suspense fallback={<FallbackObject />}>
            <ErrorBoundary fallback={<ErrorFallback />}>
              <NeuralNetwork />
            </ErrorBoundary>
            <ErrorBoundary fallback={<FallbackObject />}>
              <Particles count={gpuTier && gpuTier.tier > 2 ? 500 : 200} gpuTier={gpuTier?.tier} />
            </ErrorBoundary>
            <ErrorBoundary fallback={<FallbackObject />}>
              {renderSectionObject()}
            </ErrorBoundary>
          </Suspense>
          
          <CameraController target={currentSection} section={currentSection} />
          <Environment preset="city" />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
};

export default Scene3D;
