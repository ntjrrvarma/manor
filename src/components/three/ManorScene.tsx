'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { Suspense, useState, useEffect } from 'react';
import ManorStructure from './ManorStructure';
import CameraController from './CameraController';
import Agent3D from './Agent3D';
import { agents } from '@/lib/agents';

interface ManorSceneProps {
  scrollProgress: number;
}

export default function ManorScene({ scrollProgress }: ManorSceneProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="w-full h-screen absolute inset-0 z-0">
      <Canvas
        shadows
        camera={{ position: [5, 10, 10], fov: 50 }}
        onCreated={() => setIsLoaded(true)}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <pointLight position={[0, 5, 0]} intensity={0.5} color="#7b9cba" />
          
          {/* Environment */}
          <Environment preset="night" />
          
          {/* Camera Control */}
          <CameraController scrollProgress={scrollProgress} />
          <OrbitControls 
            enableZoom={true} 
            enablePan={false} 
            minPolarAngle={Math.PI / 4} 
            maxPolarAngle={Math.PI / 2} 
          />
          
          {/* Manor Structure */}
          <ManorStructure />
          
          {/* Agents on Each Floor */}
          {agents.map((agent) => (
            <Agent3D
              key={agent.id}
              agentId={agent.id}
              agentName={agent.name}
              position={[
                agent.position.x - 3, // Center the agents
                agent.position.y * 5 - 2.5, // Scale floor height
                agent.position.z
              ]}
              color={agent.floor === 3 ? '#c8a882' : agent.floor === 2 ? '#7b9cba' : agent.floor === 1 ? '#d4956a' : '#e8e4dc'}
            />
          ))}
          
          {/* Shadows */}
          <ContactShadows position={[0, -6, 0]} opacity={0.4} scale={20} blur={2} far={10} />
          
          {/* Post Processing */}
          <EffectComposer>
            <Bloom luminanceThreshold={0.9} intensity={0.5} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Suspense>
      </Canvas>
      
      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-midnight">
          <div className="text-pearl-amber animate-pulse">Loading Manor...</div>
        </div>
      )}
    </div>
  );
}