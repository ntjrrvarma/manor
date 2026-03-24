// Performance monitoring and optimization utilities
export const checkPerformance = () => {
  if (typeof window === 'undefined') return;
  
  // Monitor FPS
  let frameCount = 0;
  let lastTime = performance.now();
  
  const measureFPS = () => {
    frameCount++;
    const currentTime = performance.now();
    
    if (currentTime - lastTime >= 1000) {
      const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
      console.log(`📊 Current FPS: ${fps}`);
      frameCount = 0;
      lastTime = currentTime;
    }
    
    requestAnimationFrame(measureFPS);
  };
  
  measureFPS();
};

// Lazy load heavy components
export const lazyLoadComponent = (component: () => Promise<any>) => {
  return component();
};

// Optimize 3D rendering
export const threeJSOptimizations = {
  pixelRatio: Math.min(window.devicePixelRatio, 2), // Cap at 2x
  antialias: true,
  powerPreference: 'high-performance' as const,
};