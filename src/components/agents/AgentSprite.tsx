'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface AgentSpriteProps {
  agent: {
    id: number;
    name: string;
    prop: string;
    action: string;
  };
  isActive?: boolean;
  onClick?: () => void;
}

const propEmojis: Record<string, string> = {
  'clipboard': '📋',
  'magnifying-glass': '🔍',
  'chalkboard': '📝',
  'blueprints': '📐',
  'radio-tower': '📡',
  'terminal': '💻',
  'send-button': '📧',
  'wrench': '🔧',
  'podium': '🎤',
  'crates': '📦',
  'projector': '📽️',
  'ticker-tape': '📠',
  'watering-can': '🚿',
  'lock': '🔒',
  'memory-drive': '💾',
  'lever': '🎛️',
  'shovel': '⛏️',
};

export default function AgentSprite({ agent, isActive = false, onClick }: AgentSpriteProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      data-agent-id={agent.id}
      data-agent-name={agent.name.toLowerCase().replace(/\s+/g, '-')}
      className={`relative cursor-pointer transition-all duration-300 ${
        isActive ? 'agent-active' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
    >
      {/* Agent Sprite */}
      <div className="w-16 h-16 bg-soft-white bg-opacity-20 rounded flex items-center justify-center border border-glacier-blue">
        <span className="text-3xl">
          {propEmojis[agent.prop] || '👤'}
        </span>
      </div>
      
      {/* Agent Name Tag */}
      {(isHovered || isActive) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 bg-midnight border border-glacier-blue rounded text-xs"
        >
          {agent.name}
        </motion.div>
      )}
      
      {/* Active Glow Effect */}
      {isActive && (
        <div className="absolute inset-0 rounded animate-pulse bg-copper-glow opacity-20" />
      )}
    </motion.div>
  );
}