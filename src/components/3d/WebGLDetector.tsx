
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

export const WebGLDetector = () => {
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);
  
  useEffect(() => {
    // More comprehensive WebGL detection
    const detectWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        // Try to get WebGL context
        const gl = 
          canvas.getContext('webgl') || 
          canvas.getContext('experimental-webgl');
        
        if (!gl) {
          setIsWebGLSupported(false);
          toast.warning(
            "3D features are limited on your device. You're seeing a simplified version of this site.", 
            { duration: 6000 }
          );
          return false;
        }
        
        // Test if WebGL is working properly
        if (gl && 'getExtension' in gl) {
          const rendererInfo = gl.getExtension('WEBGL_debug_renderer_info');
          if (rendererInfo && 'getParameter' in gl) {
            const renderer = gl.getParameter(rendererInfo.UNMASKED_RENDERER_WEBGL);
            console.log('WebGL Renderer:', renderer);
          }
        }
        
        return true;
      } catch (e) {
        console.error('WebGL detection error:', e);
        setIsWebGLSupported(false);
        toast.warning(
          "3D features are disabled due to a browser compatibility issue.", 
          { duration: 6000 }
        );
        return false;
      }
    };
    
    detectWebGL();
  }, []);
  
  return null; // This is just a detector, no UI
};

export default WebGLDetector;
