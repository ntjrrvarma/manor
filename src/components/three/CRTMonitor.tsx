'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CRTMonitorProps {
  position: [number, number, number];
  text?: string;
  color?: string;
}

export default function CRTMonitor({ position, text = '>', color = '#c8a882' }: CRTMonitorProps) {
  const screenRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (screenRef.current && screenRef.current.material instanceof THREE.MeshBasicMaterial) {
      // Subtle screen flicker
      screenRef.current.material.opacity = 0.9 + Math.sin(state.clock.elapsedTime * 10) * 0.1;
    }
    if (glowRef.current) {
      glowRef.current.intensity = 0.5 + Math.sin(state.clock.elapsedTime * 5) * 0.2;
    }
  });

  return (
    <group position={position}>
      {/* Monitor Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 1, 0.8]} />
        <meshStandardMaterial color="#2d2d44" />
      </mesh>
      
      {/* Screen */}
      <mesh ref={screenRef} position={[0, 0, 0.41]}>
        <planeGeometry args={[1, 0.8]} />
        <meshBasicMaterial color="#080c12" transparent opacity={0.95} />
      </mesh>
      
      {/* Screen Text (Glowing) */}
      <mesh position={[0, 0, 0.42]}>
        <planeGeometry args={[0.8, 0.6]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>
      
      {/* Screen Glow */}
      <pointLight ref={glowRef} position={[0, 0, 1]} intensity={0.5} color={color} distance={3} />
      
      {/* Stand */}
      <mesh position={[0, -0.7, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#2d2d44" />
      </mesh>
    </group>
  );
}