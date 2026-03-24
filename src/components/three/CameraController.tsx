'use client';

import { useThree, useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CameraControllerProps {
  scrollProgress: number;
}

export default function CameraController({ scrollProgress }: CameraControllerProps) {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    // Smooth camera movement based on scroll
    const targetY = 10 - scrollProgress * 30; // Adjust range as needed
    targetPosition.current.set(5, targetY, 10);
    
    // Smooth interpolation
    camera.position.lerp(targetPosition.current, delta * 2);
    camera.lookAt(0, targetY - 5, 0);
  });

  return null;
}