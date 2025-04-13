
import React, { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useSpring, config } from "@react-spring/three";

interface CameraControllerProps {
  target: string;
  section: string;
}

export const CameraController = ({ target, section }: CameraControllerProps) => {
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

export default CameraController;
