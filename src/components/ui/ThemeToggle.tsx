'use client';

import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.style.setProperty('--midnight-bg', '#080c12');
      root.style.setProperty('--pearl-amber', '#c8a882');
    } else {
      root.style.setProperty('--midnight-bg', '#f5f5f5');
      root.style.setProperty('--pearl-amber', '#2d2d44');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="fixed bottom-8 right-8 z-50 px-4 py-3 bg-glacier-blue text-midnight rounded-lg 
        border-2 border-glacier-blue hover:bg-copper-glow transition-all duration-300 
        shadow-lg shadow-glacier-blue/30 font-mono font-bold"
    >
      {isDark ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}