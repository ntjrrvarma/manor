export interface Agent {
  id: number;
  name: string;
  floor: number;
  role: string;
  prop: string;
  action: string;
  clickReveals: string;
  position: { x: number; y: number; z: number };
}

export const agents: Agent[] = [
  // Floor 3 - Library & Strategy
  { id: 1, name: 'The Steward', floor: 3, role: 'Tour Guide', prop: 'clipboard', action: 'pace', clickReveals: 'bio', position: { x: 0, y: 3, z: 0 } },
  { id: 2, name: 'The Prowler', floor: 3, role: 'Research', prop: 'magnifying-glass', action: 'search', clickReveals: 'market-research', position: { x: 1, y: 3, z: 0 } },
  { id: 3, name: 'The Sleuth', floor: 3, role: 'UI/UX', prop: 'chalkboard', action: 'write', clickReveals: 'case-studies', position: { x: 2, y: 3, z: 0 } },
  { id: 4, name: 'The Quartermaster', floor: 3, role: 'System Design', prop: 'blueprints', action: 'pin', clickReveals: 'system-design', position: { x: 3, y: 3, z: 0 } },
  
  // Floor 2 - Switchboard & Sales
  { id: 11, name: 'The Broadcaster', floor: 2, role: 'LinkedIn', prop: 'radio-tower', action: 'broadcast', clickReveals: 'linkedin', position: { x: 0, y: 2, z: 0 } },
  { id: 12, name: 'The Shadow-Broker', floor: 2, role: 'Social', prop: 'terminal', action: 'hack', clickReveals: 'twitter-blog', position: { x: 1, y: 2, z: 0 } },
  { id: 13, name: 'The Dispatcher', floor: 2, role: 'Contact', prop: 'send-button', action: 'sleep', clickReveals: 'email', position: { x: 2, y: 2, z: 0 } },
  { id: 14, name: 'The Mechanic', floor: 2, role: 'Detail', prop: 'wrench', action: 'tighten', clickReveals: 'attention-detail', position: { x: 3, y: 2, z: 0 } },
  
  // Floor 1 - Forge & Observatory
  { id: 5, name: 'The Foreman', floor: 1, role: 'Projects', prop: 'podium', action: 'oversee', clickReveals: 'featured-projects', position: { x: 0, y: 1, z: 0 } },
  { id: 6, name: 'The Vault', floor: 1, role: 'Tech Stack', prop: 'crates', action: 'drop', clickReveals: 'tech-stack', position: { x: 1, y: 1, z: 0 } },
  { id: 7, name: 'The Illusionist', floor: 1, role: 'Demos', prop: 'projector', action: 'project', clickReveals: 'project-demos', position: { x: 2, y: 1, z: 0 } },
  { id: 8, name: 'The Inspector', floor: 1, role: 'Metrics', prop: 'ticker-tape', action: 'print', clickReveals: 'user-metrics', position: { x: 3, y: 1, z: 0 } },
  { id: 9, name: 'The Profiler', floor: 1, role: 'Revenue', prop: 'ticker-tape', action: 'print', clickReveals: 'revenue', position: { x: 4, y: 1, z: 0 } },
  { id: 10, name: 'The Tycoon', floor: 1, role: 'GitHub', prop: 'ticker-tape', action: 'print', clickReveals: 'github-stats', position: { x: 5, y: 1, z: 0 } },
  { id: 15, name: 'The Groundskeeper', floor: 1, role: 'CI/CD', prop: 'watering-can', action: 'water', clickReveals: 'deployment', position: { x: 6, y: 1, z: 0 } },
  { id: 16, name: 'The Locksmith', floor: 1, role: 'Security', prop: 'lock', action: 'guard', clickReveals: 'private-github', position: { x: 7, y: 1, z: 0 } },
  
  // Hallways - Internal Affairs
  { id: 17, name: 'The Warden', floor: 0, role: 'Vector DB', prop: 'memory-drive', action: 'patrol', clickReveals: 'vector-db', position: { x: 0, y: 0, z: 0 } },
  { id: 18, name: 'The Archivist', floor: 0, role: 'RAG', prop: 'memory-drive', action: 'patrol', clickReveals: 'rag-architecture', position: { x: 1, y: 0, z: 0 } },
  
  // Basement - Engine Room
  { id: 19, name: 'The Switchman', floor: -1, role: 'Theme Toggle', prop: 'lever', action: 'switch', clickReveals: 'theme-toggle', position: { x: 0, y: -1, z: 0 } },
  { id: 20, name: 'The Cryptographer', floor: -1, role: 'Performance', prop: 'shovel', action: 'shovel', clickReveals: 'lighthouse-score', position: { x: 1, y: -1, z: 0 } },
];