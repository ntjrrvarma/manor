'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { agents } from '@/lib/agents';
import AgentSprite from '@/components/agents/AgentSprite';

gsap.registerPlugin(ScrollTrigger);

export default function BasementEngineRoom() {
  const floorRef = useRef<HTMLDivElement>(null);
  const agentsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      agentsRef.current.forEach((agent, index) => {
        gsap.fromTo(agent,
          { opacity: 0, y: -50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: floorRef.current,
              start: 'top center',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, floorRef);

    return () => ctx.revert();
  }, []);

  const basementAgents = agents.filter(a => a.floor === -1);

  return (
    <section
      ref={floorRef}
      className="min-h-screen p-8 relative bg-midnight/50"
    >
      {/* Floor Header */}
      <div className="sticky top-0 z-40 bg-midnight/90 border-2 border-glacier-blue rounded-lg p-4 mb-8">
        <h2 className="text-2xl text-pearl-amber mb-2">Basement: Engine Room</h2>
        <p className="text-sm text-glacier-blue opacity-70">
          Architecture & Performance - Hyper-optimized code and systems
        </p>
      </div>

      {/* Room Elements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Theme Lever */}
        <div className="border border-glacier-blue rounded-lg p-6 bg-midnight/30 text-center">
          <h3 className="text-pearl-amber mb-4 flex items-center justify-center gap-2">
            <span className="text-2xl">🎛️</span> Theme Switcher
          </h3>
          <div className="text-6xl">🔧</div>
          <p className="mt-4 text-sm text-pearl-amber/70">
            Toggle between Dark/Light mode
          </p>
        </div>

        {/* Furnace */}
        <div className="border border-glacier-blue rounded-lg p-6 bg-midnight/30 text-center">
          <h3 className="text-pearl-amber mb-4 flex items-center justify-center gap-2">
            <span className="text-2xl">🔥</span> Performance Furnace
          </h3>
          <div className="text-6xl mb-4">💎</div>
          <div className="stat-box inline-block px-6 py-3 rounded-lg">
            <p className="text-glacier-blue font-bold text-lg">Lighthouse: 100/100</p>
          </div>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {basementAgents.map((agent, index) => (
          <div
            key={agent.id}
            ref={el => { if (el) agentsRef.current[index] = el; }}
            className="flex flex-col items-center"
          >
            <AgentSprite agent={agent} />
            <div className="mt-3 text-center">
              <p className="text-pearl-amber text-sm font-bold">{agent.name}</p>
              <p className="text-glacier-blue text-xs opacity-70">{agent.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}