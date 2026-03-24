'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { agents } from '@/lib/agents';
import AgentSprite from '@/components/agents/AgentSprite';

gsap.registerPlugin(ScrollTrigger);

export default function Floor2Switchboard() {
  const floorRef = useRef<HTMLDivElement>(null);
  const agentsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      agentsRef.current.forEach((agent, index) => {
        gsap.fromTo(agent,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
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

  const floor2Agents = agents.filter(a => a.floor === 2);

  return (
    <section
      ref={floorRef}
      className="min-h-screen border-b-2 border-glacier-blue p-8 relative bg-midnight/50"
    >
      {/* Floor Header */}
      <div className="sticky top-0 z-40 bg-midnight/90 border-2 border-glacier-blue rounded-lg p-4 mb-8">
        <h2 className="text-2xl text-pearl-amber mb-2">Floor 2: Switchboard & Sales</h2>
        <p className="text-sm text-glacier-blue opacity-70">
          Personal Brand & Communication - Social presence and contact systems
        </p>
      </div>

      {/* Room Elements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Radio Tower */}
        <div className="border border-glacier-blue rounded-lg p-6 bg-midnight/30 text-center">
          <div className="text-4xl mb-4">📡</div>
          <h3 className="text-pearl-amber mb-2">Broadcast Tower</h3>
          <div className="space-y-2 text-sm text-pearl-amber/70">
            <p>• LinkedIn Profile</p>
            <p>• Twitter/X Account</p>
            <p>• Tech Blog</p>
          </div>
        </div>

        {/* Email Button */}
        <div className="border border-glacier-blue rounded-lg p-6 bg-midnight/30 text-center">
          <div className="text-4xl mb-4">📧</div>
          <h3 className="text-pearl-amber mb-2">Contact Station</h3>
          <button className="mt-4 px-6 py-3 bg-glacier-blue text-midnight rounded font-bold hover:bg-copper-glow transition-colors">
            Send Email
          </button>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {floor2Agents.map((agent, index) => (
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