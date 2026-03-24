'use client';

import { useState } from 'react';
import { useChat } from 'ai/react';

interface ChatInterfaceProps {
  onClose: () => void;
}

export default function ChatInterface({ onClose }: ChatInterfaceProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    maxSteps: 5,
  });

  return (
    <div className="fixed inset-0 bg-midnight bg-opacity-95 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-midnight border-2 border-glacier-blue rounded-lg overflow-hidden shadow-2xl shadow-glacier-blue/20">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-glacier-blue bg-midnight">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-copper-glow rounded-full animate-pulse" />
            <h2 className="text-xl text-pearl-amber">Level 1 AI Interviewer</h2>
          </div>
          <button
            onClick={onClose}
            className="text-glacier-blue hover:text-copper-glow transition-colors text-xl"
          >
            ✕
          </button>
        </div>
        
        {/* Messages Area */}
        <div className="h-96 overflow-y-auto p-4 space-y-4 bg-midnight/50">
          {messages.length === 0 && (
            <div className="text-center text-pearl-amber opacity-70 mt-20">
              <p className="mb-2">🏰 Welcome to Midnight Manor</p>
              <p className="text-sm">Ask about my skills, experience, or background...</p>
            </div>
          )}
          
          {messages.map((message) => (
            <div
              key={message.id}
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
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-pearl-amber bg-opacity-10 border border-pearl-amber rounded-lg p-3">
                <div className="flex gap-2">
                  <span className="w-2 h-2 bg-pearl-amber rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-pearl-amber rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-pearl-amber rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-glacier-blue bg-midnight">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
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
      </div>
    </div>
  );
}