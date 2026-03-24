'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { agents } from '@/lib/agents';
import AgentSprite from '@/components/agents/AgentSprite';

gsap.registerPlugin(ScrollTrigger);

export default function Floor3Library() {
  const floorRef = useRef<HTMLDivElement>(null);
  const agentsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate agents on scroll
      agentsRef.current.forEach((agent, index) => {
        gsap.fromTo(agent,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: floorRef.current,
              start: 'top center',
              end: 'bottom center',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, floorRef);

    return () => ctx.revert();
  }, []);

  const floor3Agents = agents.filter(a => a.floor === 3);

  return (
    <section
      ref={floorRef}
      className="min-h-screen border-b-2 border-glacier-blue p-8 relative bg-midnight/50"
    >
      {/* Floor Header */}
      <div className="sticky top-0 z-40 bg-midnight/90 border-2 border-glacier-blue rounded-lg p-4 mb-8">
        <h2 className="text-2xl text-pearl-amber mb-2">Floor 3: Library & Strategy</h2>
        <p className="text-sm text-glacier-blue opacity-70">
          Soft Skills & Product Design - System architecture, research, and UI/UX
        </p>
      </div>

      {/* Room Elements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Bookshelves */}
        <div className="border border-glacier-blue rounded-lg p-6 bg-midnight/30">
          <h3 className="text-pearl-amber mb-4 flex items-center gap-2">
            <span className="text-2xl">📚</span> Research Library
          </h3>
          <div className="space-y-2 text-sm text-pearl-amber/70">
            <p>• Market Analysis Reports</p>
            <p>• User Research Documents</p>
            <p>• Competitive Studies</p>
          </div>
        </div>

        {/* Chalkboard */}
        <div className="border border-glacier-blue rounded-lg p-6 bg-midnight/30">
          <h3 className="text-pearl-amber mb-4 flex items-center gap-2">
            <span className="text-2xl">📝</span> Hypothesis Board
          </h3>
          <div className="space-y-2 text-sm text-pearl-amber/70 font-mono">
            <p>Hypothesis: X → Y</p>
            <p>Evidence: 3x spectral echo</p>
            <p>Cross-ref: Log #M-774</p>
          </div>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {floor3Agents.map((agent, index) => (
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

      {/* Floor Stats */}
      <div className="mt-8 flex gap-4 justify-center">
        <div className="stat-box px-4 py-2 rounded">
          <span className="text-xs opacity-70">Uptime:</span>
          <span className="ml-2 text-glacier-blue">99.99%</span>
        </div>
        <div className="stat-box px-4 py-2 rounded">
          <span className="text-xs opacity-70">Agents:</span>
          <span className="ml-2 text-glacier-blue">{floor3Agents.length} Active</span>
        </div>
      </div>
    </section>
  );
}