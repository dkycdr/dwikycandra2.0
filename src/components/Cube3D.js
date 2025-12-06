import React, { useEffect, useState } from 'react';
import './cube3d.css';

export default function Cube3D() {
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientY / window.innerHeight) * 360;
      const y = (e.clientX / window.innerWidth) * 360;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Auto rotation animation
    const interval = setInterval(() => {
      setRotation(prev => ({
        x: (prev.x + 0.5) % 360,
        y: (prev.y + 0.8) % 360,
        z: (prev.z + 0.3) % 360
      }));
    }, 50);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="cube3d-container">
        <div 
          className="cube3d"
          style={{
            transform: `perspective(1200px) rotateX(${rotation.x + mousePos.x * 0.1}deg) rotateY(${rotation.y + mousePos.y * 0.1}deg) rotateZ(${rotation.z}deg)`
          }}
        >
          <div className="cube-face face-front"></div>
          <div className="cube-face face-back"></div>
          <div className="cube-face face-right"></div>
          <div className="cube-face face-left"></div>
          <div className="cube-face face-top"></div>
          <div className="cube-face face-bottom"></div>
        </div>
      </div>
      
      {/* Subtle floating decorative elements */}
      <div className="floating-accent accent-1"></div>
      <div className="floating-accent accent-2"></div>
      <div className="floating-accent accent-3"></div>
      <div className="floating-accent accent-4"></div>
    </>
  );
}
