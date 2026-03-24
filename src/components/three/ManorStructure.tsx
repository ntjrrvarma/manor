'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ManorStructure() {
  const manorRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (manorRef.current) {
      // Subtle idle animation
      manorRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
    }
  });

  return (
    <group ref={manorRef} position={[0, 0, 0]}>
      {/* Floor 3 - Library (Top) */}
      <mesh position={[0, 10, 0]}>
        <boxGeometry args={[8, 0.5, 8]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      
      {/* Floor 2 - Switchboard */}
      <mesh position={[0, 5, 0]}>
        <boxGeometry args={[8, 0.5, 8]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      
      {/* Floor 1 - Forge */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[8, 0.5, 8]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      
      {/* Basement - Engine Room */}
      <mesh position={[0, -5, 0]}>
        <boxGeometry args={[8, 0.5, 8]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      
      {/* Outer Walls */}
      <mesh position={[-4, 2.5, 0]}>
        <boxGeometry args={[0.5, 15, 8]} />
        <meshStandardMaterial color="#2d2d44" />
      </mesh>
      
      <mesh position={[4, 2.5, 0]}>
        <boxGeometry args={[0.5, 15, 8]} />
        <meshStandardMaterial color="#2d2d44" />
      </mesh>
      
      <mesh position={[0, 2.5, -4]}>
        <boxGeometry args={[8, 15, 0.5]} />
        <meshStandardMaterial color="#2d2d44" />
      </mesh>
      
      <mesh position={[0, 2.5, 4]}>
        <boxGeometry args={[8, 15, 0.5]} />
        <meshStandardMaterial color="#2d2d44" />
      </mesh>
      
      {/* Roof */}
      <mesh position={[0, 13, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[9, 0.3, 9]} />
        <meshStandardMaterial color="#3d3d5c" />
      </mesh>
    </group>
  );
}