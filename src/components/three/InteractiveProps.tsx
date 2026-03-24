'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface InteractivePropsProps {
  type: 'crate' | 'monitor' | 'lever' | 'furnace' | 'book' | 'blueprint';
  position: [number, number, number];
  onClick?: () => void;
  label?: string;
}

export default function InteractiveProps({ type, position, onClick, label }: InteractivePropsProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Subtle idle animation
      if (type === 'crate') {
        meshRef.current.rotation.y += delta * 0.2;
      }
      if (type === 'monitor') {
        meshRef.current.material.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
      }
    }
  });

  const handleClick = () => {
    setIsActive(!isActive);
    onClick?.();
  };

  // Prop colors based on type
  const colors = {
    crate: '#8B4513',
    monitor: '#2d4a3e',
    lever: '#d4956a',
    furnace: '#ff6b35',
    book: '#4a3728',
    blueprint: '#7b9cba',
  };

  // Prop geometries based on type
  const geometries = {
    crate: <boxGeometry args={[0.8, 0.8, 0.8]} />,
    monitor: <boxGeometry args={[1, 0.8, 0.3]} />,
    lever: <cylinderGeometry args={[0.1, 0.1, 1.5, 8]} />,
    furnace: <cylinderGeometry args={[0.6, 0.8, 1, 16]} />,
    book: <boxGeometry args={[0.4, 0.6, 0.1]} />,
    blueprint: <planeGeometry args={[1.2, 0.8]} />,
  };

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
        castShadow
        receiveShadow
      >
        {geometries[type]}
        <meshStandardMaterial
          color={isHovered ? '#d4956a' : colors[type]}
          emissive={isHovered || isActive ? colors[type] : '#000000'}
          emissiveIntensity={isHovered || isActive ? 0.8 : 0}
        />
      </mesh>
      
      {/* Label on hover */}
      {isHovered && label && (
        <mesh position={[0, 1.5, 0]}>
          <planeGeometry args={[2, 0.5]} />
          <meshBasicMaterial color="#7b9cba" transparent opacity={0.9} />
        </mesh>
      )}
      
      {/* Glow effect on active */}
      {isActive && (
        <pointLight position={[0, 1, 0]} intensity={2} color={colors[type]} distance={5} />
      )}
    </group>
  );
}