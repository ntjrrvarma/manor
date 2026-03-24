'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { Suspense, useState, useEffect } from 'react';
import ManorStructure from './ManorStructure';
import CameraController from './CameraController';
import Agent3D from './Agent3D';
import { agents } from '@/lib/agents';
import InteractiveProps from './InteractiveProps';
import CRTMonitor from './CRTMonitor';

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

          {/* Interactive Props - Floor 1 (Forge) */}
          <InteractiveProps type="crate" position={[-2, 0, 2]} label="Python" />
          <InteractiveProps type="crate" position={[-1, 0, 2]} label="Next.js" />
          <InteractiveProps type="crate" position={[0, 0, 2]} label="PostgreSQL" />

          <CRTMonitor position={[2, 1, 2]} text="GIF" color="#7b9cba" />
          <CRTMonitor position={[2, 1, 0]} text="METRICS" color="#c8a882" />

          {/* Interactive Props - Basement (Engine Room) */}
          <InteractiveProps 
            type="lever" 
            position={[3, -5, 0]} 
            label="Theme Switch"
            onClick={() => console.log('Lever clicked!')}
          />

          <InteractiveProps 
            type="furnace" 
            position={[0, -6, 0]} 
            label="Bloatware Furnace"
            onClick={() => console.log('Furnace clicked! Lighthouse: 100/100')}
          />

          {/* Interactive Props - Floor 3 (Library) */}
          <InteractiveProps type="book" position={[-2, 10, 2]} label="Research" />
          <InteractiveProps type="book" position={[-1.5, 10, 2]} label="Case Studies" />
          <InteractiveProps type="blueprint" position={[2, 10, 0]} label="System Design" />
          
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