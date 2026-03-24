'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// UI Components
import CRTOverlay from '@/components/ui/CRTOverlay';
import StatBox from '@/components/ui/StatBox';
import ChatInterface from '@/components/ui/ChatInterface';

// Manor Floor Components
import Floor3Library from '@/components/manor/Floor3-Library';
import Floor2Switchboard from '@/components/manor/Floor2-Switchboard';
import Floor1Forge from '@/components/manor/Floor1-Forge';
import BasementEngineRoom from '@/components/manor/Basement-EngineRoom';

// 3D Scene
import ManorScene from '@/components/three/ManorScene';

// Agent Registry
import { agents } from '@/lib/agents';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeAgent, setActiveAgent] = useState<number | null>(null);
  const [avatarHovered, setAvatarHovered] = useState(false);
  const [manorEntered, setManorEntered] = useState(false);
  
  const avatarRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight;
      setScrollProgress(Math.min(progress, 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Avatar mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (avatarRef.current && !manorEntered) {
        const rect = avatarRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const rotateX = (e.clientY - centerY) / 20;
        const rotateY = (centerX - e.clientX) / 20;
        
        avatarRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [manorEntered]);

  // Handle avatar click - Launch AI Interview
  const handleAvatarClick = () => {
    // Synchronized agent wave animation
    gsap.to('[data-agent-id]', {
      rotation: 0.3,
      duration: 0.3,
      stagger: 0.05,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        setChatOpen(true);
        setManorEntered(true);
      }
    });
  };

  // Close chat and return to exterior
  const handleCloseChat = () => {
    setChatOpen(false);
    setManorEntered(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main ref={mainRef} className="min-h-screen bg-midnight relative overflow-x-hidden">
      {/* CRT Scanline Overlay */}
      <CRTOverlay />
      
      {/* 3D Manor Background (Parallax Layer) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ManorScene scrollProgress={scrollProgress} />
      </div>
      
      {/* Stat Boxes (Fixed Position) */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        <StatBox label="Uptime" value="99.99%" position="top-left" />
        <StatBox label="Agents Online" value={agents.length} position="top-right" />
        <StatBox label="Latency" value="12ms" position="bottom-right" />
      </div>
      
      {/* ==================== SCENE 1: EXTERIOR ==================== */}
      {!manorEntered && (
        <section className="h-screen flex items-center justify-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center"
          >
            {/* Title */}
            <h1 className="text-5xl md:text-6xl mb-4 text-pearl-amber font-bold tracking-wider">
              Midnight Manor
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl opacity-70 mb-8 text-pearl-amber font-mono">
              // Click the Avatar to begin the Level 1 Interview
            </p>
            
            {/* Avatar Button */}
            <motion.div
              ref={avatarRef}
              className={`w-32 h-32 mx-auto bg-soft-white bg-opacity-20 rounded-full cursor-pointer 
                border-2 border-glacier-blue flex items-center justify-center text-5xl
                transition-all duration-300 relative overflow-hidden
                ${avatarHovered ? 'scale-110 border-copper-glow shadow-lg shadow-copper-glow/30' : ''}
              `}
              onClick={handleAvatarClick}
              onMouseEnter={() => setAvatarHovered(true)}
              onMouseLeave={() => setAvatarHovered(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Avatar Emoji */}
              <span className="relative z-10">🧑‍💼</span>
              
              {/* Glow Effect */}
              {avatarHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 rounded-full bg-copper-glow opacity-20"
                />
              )}
              
              {/* Cursor Tracking Indicator */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs text-glacier-blue opacity-70">
                {avatarHovered ? 'Click to Enter' : 'Hover me'}
              </div>
            </motion.div>
            
            {/* Scroll Indicator */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-glacier-blue opacity-70"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <p className="text-sm mb-2">or scroll to explore</p>
              <div className="text-2xl">↓</div>
            </motion.div>
          </motion.div>
        </section>
      )}
      
      {/* ==================== AI CHAT INTERFACE ==================== */}
      {chatOpen && (
        <ChatInterface onClose={handleCloseChat} />
      )}
      
      {/* ==================== SCENE 2: VERTICAL GRAND TOUR ==================== */}
      <div className={`relative z-10 transition-opacity duration-1000 ${manorEntered ? 'opacity-100' : 'opacity-50'}`}>
        
        {/* Section Header */}
        <section className="min-h-[50vh] flex items-center justify-center py-20 px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl text-glacier-blue mb-4 font-mono">
              // Scroll to explore the Manor
            </h2>
            <p className="text-pearl-amber opacity-70 max-w-2xl mx-auto">
              Each floor showcases different aspects of the engineering portfolio.
              Click on agents to reveal detailed information.
            </p>
          </motion.div>
        </section>
        
        {/* Floor 3: Library & Strategy */}
        <Floor3Library activeAgent={activeAgent} onAgentClick={setActiveAgent} />
        
        {/* Floor 2: Switchboard & Sales */}
        <Floor2Switchboard activeAgent={activeAgent} onAgentClick={setActiveAgent} />
        
        {/* Floor 1: Forge & Observatory */}
        <Floor1Forge activeAgent={activeAgent} onAgentClick={setActiveAgent} />
        
        {/* Basement: Engine Room */}
        <BasementEngineRoom activeAgent={activeAgent} onAgentClick={setActiveAgent} />
      </div>
      
      {/* ==================== FOOTER ==================== */}
      <footer className="relative z-10 py-12 text-center border-t border-glacier-blue/30 bg-midnight/90">
        <div className="max-w-4xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            {/* Contact Info */}
            <div className="text-pearl-amber">
              <p className="text-lg font-bold mb-2">Interested in working together?</p>
              <a 
                href="mailto:rahul@midnightmanor.dev" 
                className="text-glacier-blue hover:text-copper-glow transition-colors underline"
              >
                rahul@midnightmanor.dev
              </a>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-4">
              <a href="#" className="text-pearl-amber hover:text-glacier-blue transition-colors text-2xl">
                💼
              </a>
              <a href="#" className="text-pearl-amber hover:text-glacier-blue transition-colors text-2xl">
                🐦
              </a>
              <a href="#" className="text-pearl-amber hover:text-glacier-blue transition-colors text-2xl">
                📝
              </a>
              <a href="#" className="text-pearl-amber hover:text-glacier-blue transition-colors text-2xl">
                🐙
              </a>
            </div>
          </div>
          
          {/* Tech Stack Credits */}
          <div className="text-sm text-pearl-amber opacity-50 font-mono">
            <p>Built with Next.js 14 + React Three Fiber + GSAP + Vercel AI SDK</p>
            <p className="mt-2">Moonlit Snow Leopard Aesthetic © 2026</p>
            <p className="mt-4 cursor-blink text-glacier-blue">|</p>
          </div>
          
          {/* Performance Badge */}
          <div className="mt-8 flex justify-center gap-4">
            <div className="stat-box px-4 py-2 rounded">
              <span className="text-xs opacity-70">Lighthouse:</span>
              <span className="ml-2 text-glacier-blue font-bold">100/100</span>
            </div>
            <div className="stat-box px-4 py-2 rounded">
              <span className="text-xs opacity-70">Performance:</span>
              <span className="ml-2 text-glacier-blue font-bold">A+</span>
            </div>
          </div>
        </div>
      </footer>
      
      {/* ==================== SCROLL PROGRESS INDICATOR ==================== */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        {[3, 2, 1, -1].map((floor) => (
          <div
            key={floor}
            className={`w-3 h-3 rounded-full border-2 border-glacier-blue transition-all duration-300
              ${scrollProgress >= (4 - floor) / 4 ? 'bg-copper-glow' : 'bg-midnight'}
            `}
            title={`Floor ${floor}`}
          />
        ))}
      </div>
      
      {/* ==================== AGENT INFO MODAL ==================== */}
      {activeAgent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-midnight/80"
          onClick={() => setActiveAgent(null)}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-midnight border-2 border-glacier-blue rounded-lg p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const agent = agents.find(a => a.id === activeAgent);
              if (!agent) return null;
              
              return (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl text-pearl-amber font-bold">{agent.name}</h3>
                      <p className="text-glacier-blue text-sm">{agent.role}</p>
                    </div>
                    <button
                      onClick={() => setActiveAgent(null)}
                      className="text-glacier-blue hover:text-copper-glow text-xl"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="border-t border-glacier-blue/30 pt-4">
                    <p className="text-pearl-amber/80 text-sm mb-4">
                      {/* Dynamic content based on agent */}
                      {agent.clickReveals === 'bio' && 'Full-stack engineer with 5+ years experience building scalable web applications.'}
                      {agent.clickReveals === 'market-research' && 'Conducted market analysis for 10+ products, identifying key user pain points.'}
                      {agent.clickReveals === 'case-studies' && 'Led UI/UX redesigns resulting in 40% improvement in user engagement.'}
                      {agent.clickReveals === 'system-design' && 'Architected microservices handling 1M+ daily requests with 99.99% uptime.'}
                      {agent.clickReveals === 'linkedin' && 'Connect on LinkedIn for professional networking and opportunities.'}
                      {agent.clickReveals === 'twitter-blog' && 'Follow for daily tech insights, tutorials, and engineering thoughts.'}
                      {agent.clickReveals === 'email' && 'Direct email for serious inquiries and collaboration opportunities.'}
                      {agent.clickReveals === 'tech-stack' && 'Core: Next.js, React, TypeScript, Node.js, Python, PostgreSQL'}
                      {agent.clickReveals === 'project-demos' && 'Interactive demos of past projects with live deployments.'}
                      {agent.clickReveals === 'lighthouse-score' && 'Achieved 100/100 Lighthouse score through performance optimization.'}
                      {/* Default fallback */}
                      {![ 'bio', 'market-research', 'case-studies', 'system-design', 'linkedin', 'twitter-blog', 'email', 'tech-stack', 'project-demos', 'lighthouse-score'].includes(agent.clickReveals) && 
                        'Detailed information about this area of expertise. Click to learn more.'}
                    </p>
                    
                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 px-4 py-2 bg-glacier-blue text-midnight rounded font-bold hover:bg-copper-glow transition-colors">
                        View Details
                      </button>
                      <button 
                        onClick={() => setActiveAgent(null)}
                        className="px-4 py-2 border border-glacier-blue text-pearl-amber rounded hover:bg-glacier-blue/20 transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </>
              );
            })()}
          </motion.div>
        </motion.div>
      )}
    </main>
  );
}