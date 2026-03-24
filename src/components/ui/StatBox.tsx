interface StatBoxProps {
  label: string;
  value: string | number;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export default function StatBox({ label, value, position }: StatBoxProps) {
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  };

  return (
    <div className={`stat-box absolute ${positionClasses[position]} px-4 py-2 rounded bg-opacity-20 bg-midnight z-50`}>
      <div className="text-xs opacity-70">{label}</div>
      <div className="text-lg font-bold">{value}</div>
    </div>
  );
}