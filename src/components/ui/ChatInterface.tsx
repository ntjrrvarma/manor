'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatInterfaceProps {
  onClose: () => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

// Mock AI responses based on resume data
const MOCK_RESPONSES: Record<string, string> = {
  'skills': 'I specialize in Next.js, React, TypeScript, Node.js, Python, and PostgreSQL. I also work with React Three Fiber and GSAP for interactive experiences.',
  'experience': 'I have 5+ years of experience building scalable web applications, leading UI/UX redesigns, and architecting microservices.',
  'contact': 'You can reach me at rahul@midnightmanor.dev for serious inquiries and collaboration opportunities.',
  'projects': 'I have 15+ featured projects including interactive portfolios, e-commerce platforms, and AI-powered applications. Would you like details on a specific one?',
  'default': 'That information is locked in the Manor\'s archives. Shall we discuss my engineering background instead? You can ask about my skills, experience, projects, or contact info.',
};

const getMockResponse = (input: string): string => {
  const lower = input.toLowerCase();
  if (lower.includes('skill') || lower.includes('tech') || lower.includes('stack')) return MOCK_RESPONSES.skills;
  if (lower.includes('experience') || lower.includes('year') || lower.includes('work')) return MOCK_RESPONSES.experience;
  if (lower.includes('contact') || lower.includes('email') || lower.includes('reach')) return MOCK_RESPONSES.contact;
  if (lower.includes('project') || lower.includes('work') || lower.includes('portfolio')) return MOCK_RESPONSES.projects;
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) return 'Hello! I\'m Rahul\'s digital clone. Ask me about his skills, experience, projects, or how to contact him.';
  return MOCK_RESPONSES.default;
};

export default function ChatInterface({ onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: '🏰 Welcome to Midnight Manor. I\'m Rahul\'s Level 1 AI Interviewer. Ask me about his skills, experience, or background...' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getMockResponse(userMessage.content),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-midnight bg-opacity-95 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-midnight border-2 border-glacier-blue rounded-lg overflow-hidden shadow-2xl shadow-glacier-blue/20"
      >
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-glacier-blue bg-midnight">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-copper-glow rounded-full animate-pulse" />
            <h2 className="text-xl text-pearl-amber">Level 1 AI Interviewer</h2>
          </div>
          <button
            onClick={onClose}
            className="text-glacier-blue hover:text-copper-glow transition-colors text-xl"
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>
        
        {/* Messages Area */}
        <div className="h-96 overflow-y-auto p-4 space-y-4 bg-midnight/50">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-glacier-blue bg-opacity-20 border border-glacier-blue text-pearl-amber'
                      : 'bg-pearl-amber bg-opacity-10 border border-pearl-amber text-pearl-amber'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-pearl-amber bg-opacity-10 border border-pearl-amber rounded-lg p-3">
                <div className="flex gap-2">
                  <span className="w-2 h-2 bg-pearl-amber rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-pearl-amber rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-pearl-amber rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-glacier-blue bg-midnight">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about my engineering background..."
              className="flex-1 bg-midnight border-2 border-glacier-blue rounded px-4 py-3 focus:outline-none focus:border-copper-glow text-pearl-amber placeholder-opacity-50"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-6 py-3 bg-glacier-blue text-midnight font-bold rounded hover:bg-copper-glow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}