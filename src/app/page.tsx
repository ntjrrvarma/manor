'use client';
import ChatInterface from '@/components/ui/ChatInterface';
import { useState, useEffect } from 'react';
import CRTOverlay from '@/components/ui/CRTOverlay';
import StatBox from '@/components/ui/StatBox';
import { agents } from '@/lib/agents';
import Floor3Library from '@/components/manor/Floor3-Library';
import Floor2Switchboard from '@/components/manor/Floor2-Switchboard';
import Floor1Forge from '@/components/manor/Floor1-Forge';
import BasementEngineRoom from '@/components/manor/Basement-EngineRoom';

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeAgent, setActiveAgent] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-midnight relative overflow-x-hidden">
      <CRTOverlay />
      
      {/* Stat Boxes */}
      <StatBox label="Uptime" value="99.99%" position="top-left" />
      <StatBox label="Agents Online" value={agents.length} position="top-right" />
      <StatBox label="Latency" value="12ms" position="bottom-right" />
      
      {/* Exterior - AI Interview Section */}
      <section className="h-screen flex items-center justify-center relative">
        <div className="text-center">
          <h1 className="text-4xl mb-4 text-pearl-amber">
            Midnight Manor
          </h1>
          <p className="text-lg opacity-70 mb-8">
            Click the Avatar to begin the Level 1 Interview
          </p>
          
          {/* Avatar Placeholder */}
          <div
            className="w-32 h-32 mx-auto bg-soft-white bg-opacity-20 rounded-full cursor-pointer hover:scale-105 transition-transform border-2 border-glacier-blue flex items-center justify-center text-5xl"
            onClick={() => setChatOpen(true)}
          >
            🧑‍💼
          </div>
        </div>
      </section>
      
      {/* Manor Floors Preview */}
      <section className="min-h-screen py-20 px-8">
        <h2 className="text-2xl text-glacier-blue mb-8 text-center">
          // Scroll to explore the Manor
        </h2>
        
       {/* Floor 3 */}
      <Floor3Library />

      {/* Floor 2 */}
      <Floor2Switchboard />

      {/* Floor 1 */}
      <Floor1Forge />

      {/* Basement */}
      <BasementEngineRoom />
      
      {/* Footer */}
      <footer className="py-8 text-center text-sm opacity-50">
        <p>Built with Next.js + React Three Fiber + GSAP</p>
        <p className="cursor-blink">|</p>
      </footer>
    </main>
  );
}