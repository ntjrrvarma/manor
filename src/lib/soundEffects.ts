// Sound effect triggers for interactions
export const playSound = (type: 'click' | 'hover' | 'scroll' | 'chat' | 'agent') => {
  // In production, you'd load actual audio files
  // For now, this is a placeholder for the sound system
  
  const sounds = {
    click: '/sounds/click.mp3',
    hover: '/sounds/hover.mp3',
    scroll: '/sounds/scroll.mp3',
    chat: '/sounds/chat.mp3',
    agent: '/sounds/agent.mp3',
  };

  // Uncomment when you have audio files
  // const audio = new Audio(sounds[type]);
  // audio.volume = 0.3;
  // audio.play().catch(() => {}); // Ignore autoplay errors
  
  console.log(`🔊 Playing sound: ${type}`);
};

export const playAgentSound = (agentId: number) => {
  // Different sounds for different agent types
  if (agentId <= 4) playSound('agent'); // Floor 3 - Library
  else if (agentId <= 14) playSound('agent'); // Floor 2 - Switchboard
  else if (agentId <= 16) playSound('agent'); // Floor 1 - Forge
  else playSound('agent'); // Basement - Engine
};