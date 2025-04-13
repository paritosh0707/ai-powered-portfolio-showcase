
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

export const WebGLDetector = () => {
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);
  
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) {
      setIsWebGLSupported(false);
      toast.warning(
        "3D features are limited on your device. You're seeing a simplified version of this site.", 
        { duration: 6000 }
      );
    }
  }, []);
  
  return null; // This is just a detector, no UI
};

export default WebGLDetector;
