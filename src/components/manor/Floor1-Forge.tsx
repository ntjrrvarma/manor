'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { agents } from '@/lib/agents';
import AgentSprite from '@/components/agents/AgentSprite';

gsap.registerPlugin(ScrollTrigger);

export default function Floor1Forge() {
  const floorRef = useRef<HTMLDivElement>(null);
  const agentsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      agentsRef.current.forEach((agent, index) => {
        gsap.fromTo(agent,
          { opacity: 0, scale: 0.5 },
          {
            opacity: 1,
            scale: 1,
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

  const floor1Agents = agents.filter(a => a.floor === 1);

  return (
    <section
      ref={floorRef}
      className="min-h-screen border-b-2 border-glacier-blue p-8 relative bg-midnight/50"
    >
      {/* Floor Header */}
      <div className="sticky top-0 z-40 bg-midnight/90 border-2 border-glacier-blue rounded-lg p-4 mb-8">
        <h2 className="text-2xl text-pearl-amber mb-2">Floor 1: Forge & Observatory</h2>
        <p className="text-sm text-glacier-blue opacity-70">
          Core Engineering & Projects - Tech stack and featured work
        </p>
      </div>

      {/* Room Elements */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Tech Stack Crates */}
        <div className="border border-glacier-blue rounded-lg p-6 bg-midnight/30">
          <h3 className="text-pearl-amber mb-4 flex items-center gap-2">
            <span className="text-2xl">📦</span> Tech Stack
          </h3>
          <div className="space-y-2">
            {['Python', 'Next.js', 'PostgreSQL', 'React', 'TypeScript'].map((tech) => (
              <div key={tech} className="px-3 py-2 bg-glacier-blue/10 border border-glacier-blue rounded text-sm text-pearl-amber">
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* Projector */}
        <div className="border border-glacier-blue rounded-lg p-6 bg-midnight/30 text-center">
          <h3 className="text-pearl-amber mb-4 flex items-center justify-center gap-2">
            <span className="text-2xl">📽️</span> Project Demos
          </h3>
          <div className="aspect-video bg-midnight border border-glacier-blue rounded flex items-center justify-center">
            <span className="text-glacier-blue opacity-50">Project GIFs Here</span>
          </div>
        </div>

        {/* Metrics */}
        <div className="border border-glacier-blue rounded-lg p-6 bg-midnight/30">
          <h3 className="text-pearl-amber mb-4 flex items-center gap-2">
            <span className="text-2xl">📊</span> Live Metrics
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-pearl-amber/70">GitHub Stars:</span>
              <span className="text-glacier-blue">1,234</span>
            </div>
            <div className="flex justify-between">
              <span className="text-pearl-amber/70">Projects:</span>
              <span className="text-glacier-blue">15+</span>
            </div>
            <div className="flex justify-between">
              <span className="text-pearl-amber/70">Lighthouse:</span>
              <span className="text-glacier-blue">100/100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {floor1Agents.map((agent, index) => (
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