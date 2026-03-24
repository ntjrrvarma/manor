'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Agent3DProps {
  position: [number, number, number];
  agentId: number;
  agentName: string;
  color?: string;
}

export default function Agent3D({ position, agentId, agentName, color = '#c8a882' }: Agent3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Idle breathing animation
      meshRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      
      // Rotate to face camera slightly
      meshRef.current.lookAt(state.camera.position.x, meshRef.current.position.y, state.camera.position.z);
    }
  });

  return (
    <group position={position}>
      {/* Agent Body */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
      >
        <boxGeometry args={[0.5, 1, 0.5]} />
        <meshStandardMaterial 
          color={isHovered ? '#d4956a' : color}
          emissive={isHovered ? '#d4956a' : '#000000'}
          emissiveIntensity={isHovered ? 0.5 : 0}
        />
      </mesh>
      
      {/* Agent Name Label (visible on hover) */}
      {isHovered && (
        <mesh position={[0, 1.5, 0]}>
          <planeGeometry args={[2, 0.5]} />
          <meshBasicMaterial color="#7b9cba" transparent opacity={0.8} />
        </mesh>
      )}
      
      {/* Glow Effect on Hover */}
      {isHovered && (
        <pointLight position={[0, 0.5, 0]} intensity={1} color="#d4956a" distance={3} />
      )}
    </group>
  );
}